from sqlalchemy import Column, Integer, String
from .database import Base, engine
class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, index=True, nullable=False)
    category = Column(String, index=True, nullable=False)
    upvotes = Column(Integer, default=0, nullable=False)
    downvotes = Column(Integer, default=0, nullable=False)
    created_at = Column(String, index=True, nullable=False, default="")
    updated_at = Column(String, index=True, nullable=False, default="")
