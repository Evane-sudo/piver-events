from enum import Enum
from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import JSON
from sqlalchemy import Enum as SQLAlchemyEnum

from app.database import Base


class EventType(str, Enum):
    LOGIN = "login"
    TRANSACTION = "transaction"
    REPORT = "report"


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(String, nullable=False)

    type = Column(
        SQLAlchemyEnum(EventType),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    payload = Column(
        JSON,
        nullable=True
    )
