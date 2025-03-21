import { Icons } from "@/components/icons/Icons";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Icons.spinner className="h-16 w-16 animate-spin text-gray-600" />
    </div>
  );
};
