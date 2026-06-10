from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database import Base
from app.database import engine
from app.database import SessionLocal

from app.models import Event
import app.models

from app.schemas import EventCreate
from typing import Optional
from app.models import EventType

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "PIVER Events API"
    }


@app.post("/events")
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db)
):
    new_event = Event(
        user_id=event.user_id,
        type=event.type,
        payload=event.payload
    )

    db.add(new_event)

    db.commit()

    db.refresh(new_event)

    return new_event


@app.get("/events")
def list_events(
    user_id: Optional[str] = None,
    type: Optional[EventType] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Event)

    if user_id:
        query = query.filter(Event.user_id == user_id)

    if type:
        query = query.filter(Event.type == type)

    return query.all()
