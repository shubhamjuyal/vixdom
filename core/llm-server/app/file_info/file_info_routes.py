from fastapi import APIRouter, UploadFile, File
from app.file_info.file_info_model import FileInfo
from app.file_info.file_info_handler import extractDataTypes

router = APIRouter(prefix="/file-info", tags=["FileInfo"])


@router.post("/extract-data-types", response_model=FileInfo)
async def parse_csv(file: UploadFile = File(...)):
    return await extractDataTypes(file)
