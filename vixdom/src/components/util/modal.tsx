import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Modal({
  trigger,
  styleClass,
  content,
  openBool,
}: {
  trigger: string | React.ReactNode;
  styleClass?: string;
  content: React.ReactNode;
  openBool?: boolean;
}) {
  return (
    <AlertDialog open={openBool}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={styleClass}>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogClose className="" />
          {/* <AlertDialogDescription>{description}</AlertDialogDescription> */}
        </AlertDialogHeader>
        {content}
      </AlertDialogContent>
    </AlertDialog>
  );
}
