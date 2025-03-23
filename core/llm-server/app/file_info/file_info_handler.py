from fastapi import APIRouter, HTTPException, UploadFile, File
import csv
from io import StringIO
from app.file_info.file_info_model import FileInfo, HeaderObject
from app.file_info.file_info_llm_service import LLMService


def infer_data_type(values):
    # Very basic type inference
    for val in values:
        if val == "":
            continue
        try:
            int(val)
        except ValueError:
            try:
                float(val)
            except ValueError:
                return "Text"
            return "Decimal"
    return "Integer"


async def extractDataTypes(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400, detail="Only CSV files are supported.")

    content = await file.read()
    decoded = content.decode("utf-8")
    csv_reader = csv.reader(StringIO(decoded))

    try:
        rows = list(csv_reader)
        if not rows:
            raise ValueError("CSV is empty")

        headers = rows[0]
        columns = list(zip(*rows[1:]))  # Transpose rows to columns

        header_objects = []
        for i, header in enumerate(headers):
            column_data = columns[i] if i < len(columns) else []
            data_type = infer_data_type(column_data)
            header_objects.append(HeaderObject(
                name=header, dataType=data_type))

        return FileInfo(headers=header_objects)

    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to parse CSV: {str(e)}")


async def inspectCsv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400, detail="Only CSV files are supported.")
    try:
        content = await file.read()
        decoded = content.decode("utf-8")
        csv_reader = csv.reader(StringIO(decoded))

        res = await LLMService().inspect_csv(list(csv_reader), "21242212")
        return res
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to parse CSV: {str(e)}")
