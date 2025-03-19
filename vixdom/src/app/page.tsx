"use client";
import Home from "./Home";
import { useCurrentState, StateContextType } from "./StateContext";
import { Icons } from "../components/icons/Icons";

export default function Page() {
  const currentState: StateContextType | undefined = useCurrentState();
  const showContent = () => {
    if (!currentState?.currentState) {
      return <Home />;
    } else if (currentState?.currentState == 1) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Icons.spinner className="h-16 w-16 animate-spin text-gray-600" />
        </div>
      );
    } else if (currentState?.currentState == 2) {
      return <div>{currentState.file.name} hi kehde!</div>;
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {showContent()}
      </main>
    </div>
  );
}
