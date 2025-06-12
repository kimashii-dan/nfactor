from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, database
database.Base.metadata.create_all(bind=database.engine)
from .database import get_db
from .gemini import generate
from .tasks import notify_admin_task
app = FastAPI()

origins = [
    "http://localhost:5173",
    "http//frontend:5173",
    "https://nfactor-p2co.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/feedbacks/", response_model=schemas.Feedback)
def create_feedback(item: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    db_item = models.Feedback(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    notify_admin_task.delay(db_item.title, db_item.description) # type: ignore

    return db_item

@app.get("/feedbacks/", response_model=list[schemas.Feedback])
def read_feedbacks(db: Session = Depends(get_db)):
    return db.query(models.Feedback).all()

@app.get("/feedbacks/{feedback_id}", response_model=schemas.Feedback)
def read_feedback(feedback_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.patch("/feedbacks/{feedback_id}", response_model=schemas.Feedback)
def update_feedback(feedback_id: int, item: schemas.FeedbackUpdate, db: Session = Depends(get_db)):
    db_item = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    update_data = item.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.delete("/feedbacks/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"ok": True}


@app.post("/generate/", response_model=schemas.GeminiResponse)
async def generate_response(request: schemas.FeedbackBase):
    try:
        response = generate(request)
        return response
    

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=f"Value error: {str(ve)}")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")