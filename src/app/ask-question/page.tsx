"use client";

import React, { useRef, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuestions } from "@/contexts/QuestionsContext"; // Update the path to the
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";

function AskQuestionPage() {
  const [category, setCategory] = useState("");
  const { addQuestion } = useQuestions();
  const titleRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const errorMessageRef = useRef<string>("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = titleRef.current?.value;

    if (!title) {
      errorMessageRef.current = "Please provide a title";
      return;
    }

    if (!category) {
      errorMessageRef.current = "Please provide select a category.";
      return;
    }

    addQuestion(title, detailsRef.current?.value ?? "", category);
    titleRef.current.value = "";
    detailsRef.current!.value = "";
    errorMessageRef.current = "";
    setCategory("");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="md:flex md:justify-center mt-3">
      <Card className="w-full max-w-3xl lg:max-w-4xl">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl">Ask a question</CardTitle>
        </CardHeader>
        <CardContent className="pt-3 lg:grid lg:gap-3">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="question">
              Question Title*
            </Label>
            <Input
              id="question"
              placeholder="Enter your question"
              ref={titleRef}
              required
            />
          </div>
          <div className="mt-4 grid gap-2">
            <Label className="text-base" htmlFor="details">
              Details
            </Label>
            <Textarea
              className="min-h-[100px] lg:min-h-[150px]"
              id="details"
              placeholder="Enter details (optional)"
              ref={detailsRef}
            />
          </div>
          <div className="mt-4 grid gap-2">
            <Label className="text-base" htmlFor="category">
              Category*
            </Label>
            <Select
              value={category}
              onValueChange={(value: string) => setCategory(value)}
            >
              <SelectTrigger className="w-[200px] lg:w-[250px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        {errorMessageRef.current && (
          <div className="text-red-500 mt-4 mx-4">
            {errorMessageRef.current}
          </div>
        )}
        <CardFooter className="flex">
          <Button className="ml-auto" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default AskQuestionPage;
