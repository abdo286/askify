"use client";

import { Question, useQuestions } from "@/contexts/QuestionsContext";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown, FaRegCommentDots } from "react-icons/fa";

interface QuestionProps {
  question: Question;
}

export function Question({ question }: QuestionProps) {
  const { updateQuestionReaction } = useQuestions();

  function handleQuestionLikeClick() {
    updateQuestionReaction(question, "like");
  }
  function handleQuestionDislikeClick() {
    updateQuestionReaction(question, "dislike");
  }

  return (
    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg p-4 ">
      <div className="text-sm font-medium">
        <Link
          className="text-gray-900 dark:text-blue-100"
          href={`/questions/${question.id}`}
        >
          {question.title}
        </Link>
      </div>
      <div className="flex items-center gap-2 text-sm mt-2 ml-auto relative mb-1">
        {/* <div className="flex items-center gap-1">
          <FaThumbsUp
            className="w-4 h-4 text-gray-900 dark:text-gray-100"
            onClick={handleQuestionLikeClick}
          />
          <span className="text-gray-900 dark:text-gray-100">
            {question.likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaThumbsDown
            className="w-4 h-4 text-gray-900 dark:text-gray-100"
            onClick={handleQuestionDislikeClick}
          />
          <span className="text-gray-900 dark:text-gray-100">
            {question.dislikes}
          </span>
        </div> */}
        <div className="flex items-center gap-1">
          <FaRegCommentDots className="w-4 h-4 text-gray-900 dark:text-gray-100" />
          <span className="text-gray-900 dark:text-gray-100">
            {question.comments.length}
          </span>
        </div>
      </div>
    </div>
  );
}
