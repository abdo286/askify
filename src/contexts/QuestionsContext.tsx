import { questionsReducer } from "@/app/reducers/questionsReducer";
import { QuestionsInitialState } from "@/data/QuestionsInitialState";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

export interface Question {
  id: number;
  title: string;
  details: string;
  category: string;
  createdAt: Date;
  modifiedAt: Date;
  likes: number;
  dislikes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  createdAt: Date;
  text: string;
}

export type Filters = {
  [prop in keyof Question]?: string;
};

export interface QuestionsState {
  questions: Question[];
  filteredQuestions: Question[]; // New property for filtered questions
  filters: Filters;
  searchTerm: string;
}

interface QuestionsContextType extends QuestionsState {
  addQuestion: (title: string, details: string, category: string) => void;
  removeQuestion: (questionId: number) => void;
  editQuestion: (question: Question) => void;
  addComment: (questionId: number, commentText: string) => void;
  removeComment: (questionId: number, commentId: number) => void;
  editComment: (questionId: number, commentId: number, newText: string) => void;
  updateQuestionReaction: (
    question: Question,
    reactionType: "like" | "dislike"
  ) => void;
  filterByCustom: (filters: Filters) => void; // New method for filtering
  filterBySearchTerm: (searchTerm: string) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

export const useQuestions = (): QuestionsContextType => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error(
      "useQuestions must be used within a QuestionsContextProvider"
    );
  }
  return context;
};

interface QuestionsContextProviderProps {
  children: ReactNode;
}

const getInitialState = (): QuestionsState => {
  const data = localStorage.getItem("questionsState");
  if (data) {
    const questions = (JSON.parse(data) as QuestionsState)?.questions;
    return {
      questions: questions,
      filteredQuestions: questions,
      filters: {},
      searchTerm: "",
    };
  }
  return QuestionsInitialState;
};

export const QuestionsContextProvider = ({
  children,
}: QuestionsContextProviderProps) => {
  const [state, dispatch] = useReducer(questionsReducer, getInitialState());

  const addQuestion = useCallback(
    (title: string, details: string, category: string) => {
      const newQuestion: Question = {
        id: Date.now(),
        title,
        details,
        category,
        createdAt: new Date(),
        modifiedAt: new Date(),
        comments: [],
        likes: 0,
        dislikes: 0,
      };
      dispatch({ type: "ADD_QUESTION", payload: newQuestion });
    },
    []
  );

  const removeQuestion = useCallback((questionId: number) => {
    dispatch({ type: "REMOVE_QUESTION", payload: questionId });
  }, []);

  const editQuestion = useCallback((question: Question) => {
    dispatch({
      type: "EDIT_QUESTION",
      payload: question,
    });
  }, []);
  const filterBySearchTerm = useCallback((searchTerm: string) => {
    dispatch({
      type: "Filter_By_SearchTerm",
      payload: searchTerm,
    });
  }, []);

  const updateQuestionReaction = useCallback(
    (question: Question, reactionType: "like" | "dislike") => {
      const questionId = question.id;
      let likedQuestions: number[] = JSON.parse(
        localStorage.getItem("likedQuestions") || "[]"
      );
      let dislikedQuestions: number[] = JSON.parse(
        localStorage.getItem("dislikedQuestions") || "[]"
      );

      const questionLikedBefore = likedQuestions.includes(questionId);
      const questionDislikedBefore = dislikedQuestions.includes(questionId);

      if (reactionType === "like") {
        if (questionLikedBefore) {
          likedQuestions = likedQuestions.filter((id) => id !== questionId);
        } else {
          if (questionDislikedBefore) {
            dislikedQuestions = dislikedQuestions.filter(
              (id) => id !== questionId
            );
          }
          likedQuestions.push(questionId);
        }
      } else if (reactionType === "dislike") {
        if (questionDislikedBefore) {
          dislikedQuestions = dislikedQuestions.filter(
            (id) => id !== questionId
          );
        } else {
          if (questionLikedBefore) {
            likedQuestions = likedQuestions.filter((id) => id !== questionId);
          }
          dislikedQuestions.push(questionId);
        }
      }

      localStorage.setItem("likedQuestions", JSON.stringify(likedQuestions));
      localStorage.setItem(
        "dislikedQuestions",
        JSON.stringify(dislikedQuestions)
      );

      // const newLikes =
      //   Number(question.likes) +
      //   (questionLikedBefore ? -1 : 0) +
      //   (reactionType === "like" ? 1 : 0);

      // const newDislikes =
      //   Number(question.dislikes) +
      //   (questionDislikedBefore ? -1 : 0) +
      //   (reactionType === "dislike" ? 1 : 0);

      editQuestion({
        ...question,
        // likes: newLikes,
        // dislikes: newDislikes,
      });
    },
    [editQuestion]
  );

  const addComment = useCallback((questionId: number, commentText: string) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: { questionId, comment: commentText },
    });
  }, []);

  const removeComment = useCallback((questionId: number, commentId: number) => {
    dispatch({ type: "REMOVE_COMMENT", payload: { questionId, commentId } });
  }, []);

  const editComment = useCallback(
    (questionId: number, commentId: number, newText: string) => {
      dispatch({
        type: "EDIT_COMMENT",
        payload: { questionId, commentId, newText },
      });
    },
    []
  );

  const filterByCustom = useCallback((filters: Filters) => {
    dispatch({ type: "FILTER_BY_Custom", payload: filters });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addQuestion,
      removeQuestion,
      editQuestion,
      addComment,
      removeComment,
      editComment,
      filterByCustom, 
      updateQuestionReaction,
      filterBySearchTerm,
    }),
    [
      state, 
      addQuestion,
      removeQuestion,
      editQuestion,
      addComment,
      removeComment,
      editComment,
      filterByCustom,
      updateQuestionReaction,
      filterBySearchTerm,
    ]
  );

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
