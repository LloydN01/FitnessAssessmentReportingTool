import json
from http.client import HTTPException

from fastapi import Depends, FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
import models
from database import SessionLocal, engine
from process import createFormTemplateSchema
from schemas import DimFormTemplateCreate

models.Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


# app implementation
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend origin here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return "temp"


@app.get("/student")
def student():
    return "student"


@app.get("/admin")
def student():
    return "admin"


@app.post("/form")
def form(form_json):
    form_data = json.loads(form_json)
    for key in form_data:
        print(key + ": " + str(form_data[key]))
    return "form"


# Sending admin id, to receive the form id's and the form titles
@app.get("/admin_forms/{id}")
def retrieve_admin_templates(admin_id: int):
    forms = get_forms(admin_id)

    sidebar_info = {}
    for form in forms:
        sidebar_info.update({form.id: form.title})

    return sidebar_info


# Create new form
@app.post("/create_form")
def add_form(form_data: DimFormTemplateCreate, db: Session = Depends(get_db)):
    try:
        # Process form data and add to database
        processed_data = createFormTemplateSchema(form_data.dict())
        created_form_template = crud.create_dim_form_template(db, processed_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {"FormTemplateID": created_form_template.FormTemplateID}


# view requested form, with everything except adminID
@app.get("/retrieve_form/{form_id}")
def retrieve_form(form_id: int):
    form = get_form(form_id)
    return jsonable_encoder(form)


# Save student form data
@app.post("/save_form_entry")
def save_form_entry(form):
    save_form(form)
    return 200
