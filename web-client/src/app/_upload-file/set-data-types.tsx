"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StateContextType, useCurrentState } from "../StateContext";
import { Dispatch, SetStateAction } from "react";

const fileInfoSchema = z.object({
  fileName: z.string().min(2, {
    message: "File name must be at least 2 characters.",
  }),
});
export type FileInfoFormValues = z.infer<typeof fileInfoSchema>;

export const SetDataTypes = ({
  setCurrentStage,
}: {
  setCurrentStage: Dispatch<SetStateAction<number>>;
}) => {
  const currentState: StateContextType | undefined = useCurrentState();

  const form = useForm<z.infer<typeof fileInfoSchema>>({
    resolver: zodResolver(fileInfoSchema),
    defaultValues: {
      fileName: "",
    },
  });
  const onSubmit = (data: FileInfoFormValues) => {
    // Handle form submission
    currentState?.changeCurrentState(1);
    setTimeout(() => {
      currentState?.changeCurrentState(2);
    }, 1000);
    console.log("Submitting form:", data);
  };
  return (
    <div className="space-y-4 h-full">
      <div className="mt-[-15px]">
        <p className="text-2xl font-semibold">Preview file data</p>
        <p className="text-gray-500">
          {"Verify file name and additional information"}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fileName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Name</FormLabel>
                <FormControl>
                  <Input placeholder="data.csv" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Table className="text-left text-gray-500 dark:text-gray-400 rtl:text-right">
            <TableHeader className="bg-gray-200 text-black dark:bg-gray-700  dark:text-gray-600">
              <TableRow>
                <TableHead>Column</TableHead>
                <TableHead>Updated Column Name</TableHead>
                <TableHead>Data Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white">
                <TableCell className="font-semibold">Customer Name</TableCell>
                <TableCell>
                  <Input placeholder="Customer Name" />
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Data Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Integer</SelectItem>
                        <SelectItem value="banana">Decimal</SelectItem>
                        <SelectItem value="blueberry">Date</SelectItem>
                        <SelectItem value="grapes">Text</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-semibold">Age</TableCell>
                <TableCell>
                  <Input placeholder="Age" />
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Data Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Integer</SelectItem>
                        <SelectItem value="banana">Decimal</SelectItem>
                        <SelectItem value="blueberry">Date</SelectItem>
                        <SelectItem value="grapes">Text</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-semibold">Date of Birth</TableCell>
                <TableCell>
                  <Input placeholder="Date of Birth" />
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Data Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Integer</SelectItem>
                        <SelectItem value="banana">Decimal</SelectItem>
                        <SelectItem value="blueberry">Date</SelectItem>
                        <SelectItem value="grapes">Text</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between">
            <Button
              variant={"outline"}
              onClick={() => {
                setCurrentStage(0);
              }}
              className="cursor-pointer"
            >
              Go Back
            </Button>
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
