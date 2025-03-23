from pydantic import BaseModel, EmailStr
from typing import Optional, List


class HeaderObject(BaseModel):
    name: str
    dataType: str


class FileInfo(BaseModel):
    headers: List[HeaderObject]
