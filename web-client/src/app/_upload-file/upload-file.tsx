"use client";
import { useFileState } from "../StateContext";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/util/modal";
import DragDrop from "@/components/util/file-uploader";
import { API_URL, fileTypes } from "../constants/file";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SetDataTypes } from "./set-data-types";
import { API } from "../services/client-api.service";
import { IFileInfo } from "../interface";

export const UploadFile = () => {
  const [openBool, setOpenBool] = useState<boolean>(false);
  const [currenStage, setCurrentStage] = useState(0);
  const [fileInfo, setFileInfo] = useState<IFileInfo>();
  const [file, setFile] = useFileState();
  const currentFile = useRef(file);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      toast("Invalid file type. Please upload a CSV or XLSX file.");
    }
  };
  {
    const handleFileUpload = async () => {
      setCurrentStage(1);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await API.post(
          API_URL + "/file-upload/extract-data-types",
          formData
        );
        console.log("res: ", res);
        setFileInfo(res.data);
        setTimeout(() => {
          toast(res?.data?.message);
          setCurrentStage(2);
        }, 1000); // increase loading time
      } catch (e: any) {
        toast(e?.response?.data?.message || "Upload failed, please try again.");
        setCurrentStage(0);
      }
    };

    const getCurrentStage = () => {
      switch (currenStage) {
        case 1:
          return <LoadingSpinner />;
        case 2:
          return (
            <SetDataTypes
              fileInfo={fileInfo}
              setCurrentStage={setCurrentStage}
            />
          );
      }
    };

    return (
      <Modal
        trigger={
          <Button
            size={"lg"}
            onClick={() => setOpenBool(true)}
            className="cursor-pointer"
            variant={"default"}
          >
            Import Data
          </Button>
        }
        styleClass={"!max-w-2xl min-h-[37%] flex flex-col"}
        openBool={openBool}
        content={
          <div>
            {getCurrentStage() || (
              <>
                <div className="mt-[-15px]">
                  <p className="text-2xl font-semibold">
                    Select files to upload
                  </p>
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
                    onClick={handleFileUpload}
                  >
                    Proceed
                  </Button>
                </div>
              </>
            )}
          </div>
        }
      />
    );
  }
};
