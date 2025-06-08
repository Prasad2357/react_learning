from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from repository import PDF_Repository


router = APIRouter(prefix="/pdf", tags=["PDF Storage with pages"])

@router.post("/store-pdf-pages")
async def insert_job_description(
    file: UploadFile = File(...),
    selectedPages: str = Form(...)
):
    pdf_id = PDF_Repository.insert_pdf_with_pages(file,selectedPages)
    return {"message": "PDF inserted successfully", "PDF_id": pdf_id}


@router.get("/get-selected-pages/{pdf_id}")
def get_selected_pages(pdf_id: str):

    return PDF_Repository.get_selected_page(pdf_id)
    
