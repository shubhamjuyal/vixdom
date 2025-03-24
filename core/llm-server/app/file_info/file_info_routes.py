from fastapi import APIRouter, Form, UploadFile, File
from app.file_info.file_info_model import FileInfo
from app.file_info.file_info_handler import extractDataTypes, inspectCsv

router = APIRouter(prefix="/file-info", tags=["FileInfo"])


@router.post("/extract-data-types", response_model=FileInfo)
async def parse_csv(file: UploadFile = File(...)):
    return await extractDataTypes(file)


@router.post("/inspect-csv")
async def inspect_csv(sessionId: str = Form(...), file: UploadFile = File(...)):
    return await inspectCsv(sessionId, file)
