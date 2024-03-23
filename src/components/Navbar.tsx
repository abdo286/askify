"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "usehooks-ts";
import { type ChangeEvent } from "react";
import { useQuestions } from "@/contexts/QuestionsContext";

function Navbar() {
  const { filterBySearchTerm } = useQuestions();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    filterBySearchTerm(value);
  };
  const debouncedHandleSearch = useDebounceCallback(handleSearch, 300);

  return (
    <nav className="lg:w-[95%] mx-auto bg-[#5356FF] dark:bg-[#1F2937] lg:rounded-md lg:mt-3 py-3 flex items-center">
      <h3 className="text-[#DFF5FF] dark:text-[#D1D5DB] text-xl px-6 w-fit">
        <Link href="/">Askify</Link>
      </h3>
      <div className="ml-auto mr-5 text-sm">
        <Input
          className="block w-full p-2 ps-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border  border-gray-300 dark:border-gray-500 ring-blue-500 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Search..."
          type="text"
          defaultValue=""
          onChange={debouncedHandleSearch}
        />
      </div>
    </nav>
  );
}
export default Navbar;
