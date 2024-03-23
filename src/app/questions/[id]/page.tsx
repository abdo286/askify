"use client";

import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Question, useQuestions } from "@/contexts/QuestionsContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

function getQuestion(questionId: string, questions: Question[]) {
  if (!parseInt(questionId)) return null;

  return questions.find((q: Question) => q.id === Number(questionId));
}

export default function Component() {
  const { id } = useParams<{ id: string }>();
  const { questions } = useQuestions();
  const question = getQuestion(id, questions);
  const [comment, setComment] = useState<string>("");
  const { addComment } = useQuestions();
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (question == null) {
    return (
      <div className="flex items-center flex-col gap-3 mt-12">
        <h3 className="text-2xl font-semibold">Not Found</h3>
        <Link href="/">
          <Button className="mt-5" size="lg" variant="gray">
            Go Home
          </Button>
        </Link>
      </div>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!!comment) {
      addComment(question!.id, comment);
      setComment("");
      setErrorMessage("");
    } else {
      setErrorMessage("Please provide a comment");
    }
  }

  return (
    <Card className="p-4 lg:mt-3 bg-white lg:max-w-4xl mx-auto">
      <CardHeader className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{question.title}</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-4">
          <div className="bg-white rounded-lg">
            <div className="grid gap-4">
              <form className="bg-white p-4 rounded-lg" onSubmit={handleSubmit}>
                <Textarea
                  className="border border-gray-200 p-2 focus:ring-2 ring-gray-300 focus:ring-gray-400 lg:min-h-[180px]"
                  placeholder="Add your comment..."
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    const value = e.target!.value;
                    setComment(value);
                    if (!!value) setErrorMessage("");
                  }}
                />
                <div className="bg-white p-4 rounded-lg w-full flex">
                  <Button
                    className="bg-gray-800 text-gray-100 ml-auto"
                    size="sm"
                    variant="outline"
                    type="submit"
                  >
                    Comment
                  </Button>
                </div>

                <div>
                  {errorMessage && (
                    <div className="text-red-500 mt-1 mx-1">{errorMessage}</div>
                  )}
                </div>
              </form>

              {question.comments.map((comment) => (
                <div key={comment.id} className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Anonymous</div>
                      {comment?.createdAt?.toLocaleDateString ? (
                        <div className="text-gray-500 text-xs">
                          {comment.createdAt.toLocaleDateString()} ago
                        </div>
                      ) : null}
                      <div>{comment.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
