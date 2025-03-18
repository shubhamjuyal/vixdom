"use client";
import React, { useState, useEffect } from "react";

const fileTypes = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

function DragDrop() {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log("file: ", file);
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Invalid file type. Please upload a CSV or XLSX file.");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && fileTypes.includes(droppedFile.type)) {
      setFile(droppedFile);
    } else {
      alert("Invalid file type. Please upload a CSV or XLSX file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col py-4 space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full max-w-full h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer transition duration-300 hover:border-blue-500 rounded-lg bg-gray-50"
      >
        {file ? (
          <p className="text-gray-700 font-medium">{file.name}</p>
        ) : (
          <p className="text-gray-400">Drag & Drop a CSV or XLSX file here</p>
        )}
      </div>
      <label className="cursor-pointer rounded-md border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
        Browse Files
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default DragDrop;
