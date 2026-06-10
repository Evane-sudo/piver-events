from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.get("/users/{user_id}/summary")
def user_summary(
    user_id: str,
    db: Session = Depends(get_db)
):
    events = db.query(Event).filter(Event.user_id == user_id).all()

    if not events:
        return {
            "user_id": user_id,
            "total_events": 0,
            "event_types": {},
            "first_event": None,
            "last_event": None
        }

    event_types = {}

    for event in events:
        event_type = event.type.value

        if event_type not in event_types:
            event_types[event_type] = 0

        event_types[event_type] += 1

    return {
        "user_id": user_id,
        "total_events": len(events),
        "event_types": event_types,
        "first_event": min(event.created_at for event in events),
        "last_event": max(event.created_at for event in events)
    }
