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
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StateContextType, useCurrentState } from "../StateContext";
import { Dispatch, SetStateAction } from "react";
import { IFileInfo } from "../interface";
import { dataTypeList } from "../constants/file";

const fileInfoSchema = z.object({
  fileName: z.string().min(2, {
    message: "File name must be at least 2 characters.",
  }),
  headers: z.array(
    z.object({
      name: z.string().min(1, { message: "Header name is required" }),
      dataType: z.string().min(1, { message: "Data type is required" }),
    })
  ),
});
export type FileInfoFormValues = z.infer<typeof fileInfoSchema>;

export const SetDataTypes = ({
  fileInfo,
  setCurrentStage,
}: {
  fileInfo: IFileInfo | undefined;
  setCurrentStage: Dispatch<SetStateAction<number>>;
}) => {
  const currentState: StateContextType | undefined = useCurrentState();

  const form = useForm<z.infer<typeof fileInfoSchema>>({
    resolver: zodResolver(fileInfoSchema),
    defaultValues: {
      fileName: fileInfo?.fileName || "",
      headers: fileInfo?.headers || [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "headers",
  });

  // on form submission
  const onSubmit = (data: FileInfoFormValues) => {
    // Handle form submission
    currentState?.changeCurrentState(1);
    setTimeout(() => {
      currentState?.changeCurrentState(2);
    }, 1000);
    console.log("Submitting form:", data);
  };
  return (
    <div className="space-y-4  ">
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
          <div className="scrollbar-thin max-h-[300px] overflow-y-auto">
            <Table className="text-left text-gray-500 dark:text-gray-400 rtl:text-right">
              <TableHeader className="bg-gray-200 text-black dark:bg-gray-700  dark:text-gray-600">
                <TableRow>
                  <TableHead>Column</TableHead>
                  <TableHead>Updated Column Name</TableHead>
                  <TableHead>Data Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id} className="bg-white">
                    <TableCell className="font-semibold">
                      {field.name}
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`headers.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Column Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`headers.${index}.dataType`}
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(val) => field.onChange(val)}
                              value={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Data Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {dataTypeList.map(
                                    (item: string, idx: number) => (
                                      <SelectItem key={idx} value={item}>
                                        {item}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
