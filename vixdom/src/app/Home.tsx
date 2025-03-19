"use client";
import { changeState, StateContextType } from "./StateContext";
import { Button } from "@/components/ui/button";
import ImportData from "./import-data";

export default function Home() {
  return (
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
        <ImportData />
        <Button
          size={"lg"}
          variant={"outline"}
          className="cursor-pointer px-[40px]"
        >
          About
        </Button>
      </div>
    </div>
  );
}
