import {
  type Filters,
  type Question,
  type QuestionsState,
} from "@/contexts/QuestionsContext";

type Action =
  | { type: "Filter_By_SearchTerm"; payload: string }
  | { type: "ADD_QUESTION"; payload: Question }
  | { type: "REMOVE_QUESTION"; payload: number }
  | {
      type: "EDIT_QUESTION";
      payload: Question;
    }
  | { type: "ADD_COMMENT"; payload: { questionId: number; comment: string } }
  | {
      type: "REMOVE_COMMENT";
      payload: { questionId: number; commentId: number };
    }
  | {
      type: "EDIT_COMMENT";
      payload: { questionId: number; commentId: number; newText: string };
    }
  | { type: "FILTER_BY_Custom"; payload: Filters };

export const questionsReducer = (
  state: QuestionsState,
  action: Action
): QuestionsState => {
  let newState;

  switch (action.type) {
    case "ADD_QUESTION":
      newState = {
        ...state,
        questions: [...state.questions, action.payload],
        filteredQuestions: applyFilters(
          [...state.questions, action.payload],
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "REMOVE_QUESTION":
      newState = {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload
        ),
        filteredQuestions: applyFilters(
          state.questions.filter((question) => question.id !== action.payload),
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "EDIT_QUESTION":
      newState = {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.id ? action.payload : question
        ),
        filteredQuestions: applyFilters(
          state.questions,
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "ADD_COMMENT":
      newState = {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.questionId
            ? {
                ...question,
                comments: [
                  ...question.comments,
                  {
                    id: Date.now(),
                    text: action.payload.comment,
                    createdAt: new Date(),
                  },
                ],
              }
            : question
        ),
        filteredQuestions: applyFilters(
          state.questions,
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "REMOVE_COMMENT":
      newState = {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.questionId
            ? {
                ...question,
                comments: question.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : question
        ),
        filteredQuestions: applyFilters(
          state.questions,
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "EDIT_COMMENT":
      newState = {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.questionId
            ? {
                ...question,
                comments: question.comments.map((comment) =>
                  comment.id === action.payload.commentId
                    ? { ...comment, text: action.payload.newText }
                    : comment
                ),
              }
            : question
        ),
        filteredQuestions: applyFilters(
          state.questions,
          state.filters,
          state.searchTerm
        ),
      };
      break;
    case "FILTER_BY_Custom":
      newState = {
        ...state,
        filters: action.payload,
        filteredQuestions: applyFilters(
          state.questions,
          action.payload,
          state.searchTerm
        ),
      };
      break;

    case "Filter_By_SearchTerm":
      const searchTerm = action.payload.toLowerCase(); // Convert to lowercase for case-insensitive matching
      const filteredQuestions = state.questions.filter(
        (question) =>
          question.title.toLowerCase().includes(searchTerm) ||
          question.details.toLowerCase().includes(searchTerm)
      );
      newState = {
        ...state,
        filteredQuestions,
        searchTerm,
      };

      break;

    default:
      newState = state;
  }

  localStorage.setItem("questionsState", JSON.stringify(newState));
  return newState;
};

const applyFilters = (
  questions: Question[],
  filters: Filters,
  searchTerm: string
): Question[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return questions;
  }

  let filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchTerm) ||
      question.details.toLowerCase().includes(searchTerm)
  );

  filteredQuestions = filteredQuestions.filter((question: Question) => {
    return Object.keys(filters).every((filterKey) => {
      if (question.hasOwnProperty(filterKey)) {
        const validFilterKey = filterKey as keyof Question;
        return question[validFilterKey] === filters[validFilterKey];
      }
      return true;
    });
  });
  return filteredQuestions;
};
