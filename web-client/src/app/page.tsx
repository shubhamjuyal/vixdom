"use client";
import Home from "./Home";
import { useCurrentState } from "./StateContext";
import { Chat } from "./Chat";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Page() {
  const { currentState } = useCurrentState() || {}; // Destructuring for better readability

  const renderContent = () => {
    switch (currentState) {
      case 1:
        return <LoadingSpinner />;
      case 2:
        return <Chat />;
      default:
        return <Home />;
    }
  };

  return <main>{renderContent() || <Home />}</main>;
}
