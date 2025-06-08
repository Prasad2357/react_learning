import json
from fastapi import UploadFile, HTTPException
from utils.common.db_manager import db_manager

class PDF_Repository:
    @staticmethod
    def insert_pdf_with_pages(job_desc_file: UploadFile, selected_pages: str):
        """
        Attaches a PDF file with its selected pages.
        """
        db = db_manager.databases.get("pdf_storer")
        if not db:
            raise HTTPException(status_code=404, detail="Database 'pdf_storer' not found.")

        # Safely parse selected pages
        try:
            selected_pages_list = json.loads(selected_pages)
            if not isinstance(selected_pages_list, list):
                raise ValueError
        except (json.JSONDecodeError, ValueError):
            raise HTTPException(status_code=400, detail="selectedPages must be a JSON list string.")

        # Add selected pages to the document metadata
        jd_doc = {
            "extracted_json": None,
            "selected_pages": selected_pages_list
        }

        doc_id, _ = db.save(jd_doc)

        # Save the PDF as an attachment
        db.put_attachment(db[doc_id], job_desc_file.file, filename="jd.pdf", content_type=job_desc_file.content_type)

        return doc_id
    
    @staticmethod
    def get_selected_page(pdf_id:str):
        db = db_manager.databases.get("pdf_storer")
        if not db or pdf_id not in db:
            raise HTTPException(status_code=404, detail="PDF not found")
        
        doc = db[pdf_id]
        return {"selected_pages": doc.get("selected_pages", [])}
