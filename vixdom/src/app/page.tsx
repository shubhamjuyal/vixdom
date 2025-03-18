import { Button } from "@/components/ui/button";
import DragDrop from "@/components/util/file-uploader";
import { Modal } from "@/components/util/modal";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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
            <Modal
              trigger={
                <Button
                  size={"lg"}
                  className="cursor-pointer"
                  variant={"default"}
                >
                  Import Data
                </Button>
              }
              styleClass={"!max-w-2xl"}
              content={
                <div className="">
                  <div className="mt-[-20px]">
                    <p className="text-2xl font-semibold">
                      Select files to upload
                    </p>
                    <p className="text-gray-500">
                      {"Drag a file to upload, or click on 'Browse Files'"}
                    </p>
                  </div>
                  <DragDrop></DragDrop>
                </div>
              }
            ></Modal>

            <Button size={"lg"} className="cursor-pointer" variant={"outline"}>
              About
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
