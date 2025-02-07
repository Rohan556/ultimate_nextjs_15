"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import React from "react";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { z } from "zod";
import TagCard from "../cards/TagCard";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = React.useRef(null);
  const [tagEntered, setTagEntered] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log({ data });
  };

  const handleRemoveTag = (name: string) =>
    setTagEntered((prev) => prev.filter((tag) => tag !== name));

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log({});
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value?.length < 15) {
        setTagEntered((prev) => [...prev, value]);
        event.currentTarget.value = "";
        form.clearErrors("tags");
        form.setValue("tags", "");
      } else if (value?.length > 15) {
        form.setError("tags", {
          type: "maxLength",
          message: "Tag must be less than 15 characters",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] rounded-1.5 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you are asking a question to another
                human
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Content <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  editorRef={editorRef}
                  value={field.value}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you have put in the
                title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] rounded-1.5 border"
                    placeholder="Add tags"
                    onKeyDown={(e) => handleInputKeydown(e)}
                    {...field}
                  />
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {tagEntered.map((value) => (
                      <TagCard
                        key={value}
                        name={value}
                        isRemovableButton
                        handleRemoveTag={handleRemoveTag}
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add upto 3 tags to describe what your question is about. Press
                enter to add a tag
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            Ask Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
