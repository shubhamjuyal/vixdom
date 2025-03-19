"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/util/modal";
import DragDrop from "@/components/util/file-uploader";
import { useRef, useState } from "react";
import {
  useCurrentState,
  useFileState,
  StateContextType,
} from "./StateContext";
import { fileTypes } from "./constants/file";

const ImportData = () => {
  const [openBool, setOpenBool] = useState<boolean>(false);
  const [file, setFile] = useFileState();
  const currentState: StateContextType | undefined = useCurrentState();

  const currentFile = useRef(file);
  console.log(file);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Invalid file type. Please upload a CSV or XLSX file.");
    }
  };

  return (
    <Modal
      trigger={
        <Button
          size={"lg"}
          onClick={() => {
            setOpenBool(true);
          }}
          className="cursor-pointer"
          variant={"default"}
        >
          Import Data
        </Button>
      }
      styleClass={"!max-w-2xl"}
      openBool={openBool}
      content={
        <div>
          <div className="mt-[-20px]">
            <p className="text-2xl font-semibold">Select files to upload</p>
            <p className="text-gray-500">
              {"Drag a file to upload, or click on 'Browse Files'"}
            </p>
          </div>
          <DragDrop />
          <div className="flex justify-between">
            <label className="cursor-pointer rounded-md border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base w-[35%] md:w-[20%]">
              Browse Files
              <input
                type="file"
                accept=".csv, .xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <Button
              size={"lg"}
              disabled={currentFile.current == file}
              className="cursor-pointer"
              onClick={() => {
                setOpenBool(false);
                currentState?.changeCurrentState(1);
                setTimeout(() => {
                  currentState?.changeCurrentState(2);
                }, 1000);
              }}
            >
              Proceed
            </Button>
          </div>
        </div>
      }
    ></Modal>
  );
};

export default ImportData;
