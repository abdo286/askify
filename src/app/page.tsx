"use client";

import { Question } from "@/components/Question";
import AskQuestionHeader from "@/components/AskQuestionHeader";
import { useQuestions } from "../contexts/QuestionsContext";
const AskQuestionsPage = () => {
  const { filteredQuestions } = useQuestions();
  return (
    <main>
      <AskQuestionHeader />
      <div className="w-full flex flex-col justify-center lg:justify-star">
        <div className="w-full max-w-3xl mx-auto lg:max-w-full lg:px-8 px-4">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredQuestions.map((question) => (
              <Question key={question.id} question={question} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default AskQuestionsPage;
