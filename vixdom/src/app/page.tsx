"use client";
import Home from "./Home";
import { useCurrentState } from "./StateContext";
import { Icons } from "../components/icons/Icons";
import { Chat } from "./Chat";

export default function Page() {
  const { currentState } = useCurrentState() || {}; // Destructuring for better readability

  const renderContent = () => {
    switch (currentState) {
      case 1:
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Icons.spinner className="h-16 w-16 animate-spin text-gray-600" />
          </div>
        );
      case 2:
        return <Chat />;
      default:
        return (
          <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
              <Home />
            </div>
          </div>
        );
    }
  };

  return <main>{renderContent()}</main>;
}
