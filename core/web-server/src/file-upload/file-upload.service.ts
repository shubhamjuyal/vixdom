import { Injectable, BadRequestException } from "@nestjs/common";
import { File as MulterFile } from "multer";
import * as XLSX from "xlsx";
import * as moment from "moment";

@Injectable()
export class FileUploadService {
  validateFile(file: MulterFile) {
    if (!file) {
      throw new BadRequestException("File is not provided");
    }

    if (!file.originalname.match(/\.(csv|xls|xlsx)$/)) {
      throw new BadRequestException("Only CSV and Excel files are allowed!");
    }
  }

  extractDataTypes(file: MulterFile) {
    this.validateFile(file);

    let headers: string[] = [];
    let dataRows: any[] = [];
    try {
      // for CSV (.csv)
      if (file.originalname.endsWith(".csv")) {
        const fileContent = file.buffer.toString("utf8");
        const lines = fileContent.split(/\r?\n/).filter((line) => line.trim());

        headers = lines[0].split(",").map((header) => header.trim());
        dataRows = lines
          .slice(1)
          .map((line) => line.split(",").map((val) => val.trim()));
      }
      // for Excel (.xls, .xlsx)
      else {
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // i.e. the first sheet
        const sheet = workbook.Sheets[sheetName];

        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        headers = sheetData[0] as string[];
        dataRows = sheetData.slice(1);
      }

      const headerDetails = headers.map((name, index) => ({
        name,
        dataType: inferDataType(
          dataRows.map((row) => row[index]?.toString() || "")
        ),
      }));

      return {
        message: "File uploaded successfully.",
        fileName: file.originalname,
        headers: headerDetails,
      };
    } catch (e) {
      console.error(e.message);
    }
  }
}

function inferDataType(values: string[]): string {
  for (const val of values) {
    if (val === "") continue;

    if (isDate(val)) {
      return "Date";
    }

    if (!isNaN(parseInt(val, 10))) {
      return "Integer";
    }

    if (!isNaN(parseFloat(val))) {
      return "Decimal";
    }

    return "Text";
  }
  return "Integer";
}

const dateFormats = [
  "DD-MM-YYYY",
  "YYYY/MM/DD",
  "YYYY-MM-DD",
  "MM/DD/YYYY",
  "DD/MM/YYYY",
];

function isDate(value: string): boolean {
  return dateFormats.some((format) => moment(value, format, true).isValid());
}
