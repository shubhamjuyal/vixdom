import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Modal({
  trigger,
  triggerStyle,
  title,
  description,
  styleClass,
  content,
  openBool,
}: {
  trigger: string | React.ReactNode;
  triggerStyle?: string;
  title: string;
  description?: string;
  styleClass?: string;
  content: React.ReactNode;
  openBool?: boolean;
}) {
  return (
    <AlertDialog open={openBool}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className={styleClass}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogClose />
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {content}
      </AlertDialogContent>
    </AlertDialog>
  );
}
