"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { useQuestions } from "@/contexts/QuestionsContext";

const AskQuestionHeader = () => {
  const router = useRouter();
  const { filterByCustom } = useQuestions();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterByCustom({ category: value });
  };

  // Function to undo the filter
  const handleUndoFilter = () => {
    setSelectedCategory(""); 
    filterByCustom({}); // Filter by an empty category (show all questions
  };

  return (
    <header className="w-[90%] mx-auto rounded-md mt-3 mb-6 py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Questions</h1>
        <Button
          className="bg-gray-900 text-white hover:bg-gray-800 ml-auto"
          size="sm"
          variant="outline"
          onClick={() => {
            router.push("/ask-question");
          }}
        >
          Ask question
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-6">
        <h3 className="font-semibold text-lg">Filter By: </h3>

        <div className="ml-3">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {/* Render categories */}
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Render "Undo Filter" button */}
        {selectedCategory && (
          <Button
            className="bg-gray-300 text-gray-900 hover:bg-gray-400"
            size="sm"
            onClick={handleUndoFilter}
          >
            Undo Filter
          </Button>
        )}
      </div>
    </header>
  );
};
export default AskQuestionHeader;
