from sqlalchemy import JSON, TIMESTAMP, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base

# User model
class DimUser(Base):
    __tablename__ = "dim_user"

    StudentID = Column(Integer, primary_key=True)
    FirstName = Column(String, index=True)
    LastName = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    disabled=Column(Boolean)

    def __repr__(self):
        return (
            f"DimUser(UserId={self.UserId}, FirstName='{self.FirstName}', "
            f"LastName='{self.LastName}', StudentId={self.StudentID}, "
            f"email='{self.email}')"
        )

# Admin model
class DimAdmin(Base):
    __tablename__ = "dim_admin"

    StaffID = Column(Integer, primary_key=True)
    FirstName = Column(String, index=True)
    LastName = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Form template model
class DimFormTemplate(Base):
    __tablename__ = "dim_form_templates"

    FormTemplateID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    StaffID = Column(Integer, ForeignKey(DimAdmin.StaffID))
    FormTemplate = Column(JSON)
    Title = Column(String)
    Description = Column(String)
    CreatedAt = Column(String)

# User data response model
class DimUserFormResponse(Base):
    __tablename__ = "dim_user_form_response"

    UserFormResponseID = Column(Integer, primary_key=True)
    UserFormResponse = Column(JSON)

# User form response model
class FactUserForm(Base):
    __tablename__ = "fact_user_form"
    FactUserFormID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    UserFormResponseID = Column(
        Integer, ForeignKey(DimUserFormResponse.UserFormResponseID), index=True
    )
    FormTemplateID = Column(
        Integer,
        ForeignKey(DimFormTemplate.FormTemplateID),
        index=True,
        autoincrement=True,
    )
    StudentID = Column(Integer, ForeignKey(DimUser.StudentID), index=True)
    SubjectStudentID = Column(
        Integer, ForeignKey(DimUser.StudentID), index=True
    )  # TODO: Investigate -  Would this work if the student does not exist
    IsComplete = Column(Boolean, default=True)
    CreatedAt = Column(String)
    CompleteAt = Column(String)
