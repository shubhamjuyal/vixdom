"use client";
import { Button } from "@/components/ui/button";
import { UploadFile } from "./_upload-file/upload-file";

export default function Home() {
  return (
    <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col justify-center items-center w-full space-y-4">
          <p className="text-5xl text-center font-semibold">
            Turn your data into powerful visuals!
          </p>
          <p className="md:w-[60%] w-[90%] text-center">
            {
              "Your data stays private. We don't store or use your uploads for training. Our AI processes your files securely and generates insightful visualizations in real time."
            }
          </p>

          <div className="flex gap-4 items-center flex-col sm:flex-row ">
            <UploadFile />
            <Button
              size={"lg"}
              variant={"outline"}
              className="cursor-pointer px-[40px]"
            >
              About
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
