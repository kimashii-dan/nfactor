from typing import Optional
from pydantic import BaseModel

class FeedbackBase(BaseModel):
    title: str
    description: str
    category: str
    upvotes: int = 0
    downvotes: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    upvotes: Optional[int] = None
    downvotes: Optional[int] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class Feedback(FeedbackBase):
    id: int

    class Config:
        orm_mode = True