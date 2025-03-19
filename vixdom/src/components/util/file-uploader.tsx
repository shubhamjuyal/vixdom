"use client";
import { fileTypes } from "@/app/constants/file";
import { useFileState } from "@/app/StateContext";
import React from "react";

function DragDrop() {
  const [file, setFile] = useFileState();

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
    </div>
  );
}

export default DragDrop;
