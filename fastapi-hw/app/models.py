from sqlalchemy import Column, Integer, String
from .database import Base

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




#   id: string;
#   title: string;
#   description: string;
#   category: "UI" | "Performance" | "Feature";
#   upvotes: number;
#   downvotes: number;
#   createdAt: Date;
#   updatedAt: Date;