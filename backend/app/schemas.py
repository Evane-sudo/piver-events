from typing import Optional

from pydantic import BaseModel

from app.models import EventType


class EventCreate(BaseModel):
    user_id: str
    type: EventType
    payload: Optional[dict] = None
