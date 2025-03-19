"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/util/modal";
import DragDrop from "@/components/util/file-uploader";

const ImportData = () => {
  return (
    <Modal
      trigger={
        <Button size={"lg"} className="cursor-pointer" variant={"default"}>
          Import Data
        </Button>
      }
      styleClass={"!max-w-2xl"}
      content={
        <div className="">
          <div className="mt-[-20px]">
            <p className="text-2xl font-semibold">Select files to upload</p>
            <p className="text-gray-500">
              {"Drag a file to upload, or click on 'Browse Files'"}
            </p>
          </div>
          <DragDrop></DragDrop>
        </div>
      }
    ></Modal>
  );
};

export default ImportData;
