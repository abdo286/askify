import {
  type Question,
  type QuestionsState,
} from "@/contexts/QuestionsContext";

const defaultQuestions: Question[] = [
  {
    id: 1,
    title: "How to update state in React?",
    details:
      "I'm having trouble understanding how to properly update state in React components.",
    category: "technology",
    createdAt: new Date(),
    modifiedAt: new Date(),
    likes: 10,
    dislikes: 2,
    comments: [
      {
        id: 1,
        createdAt: new Date(),
        text: "You can use the useState hook for functional components or this.setState for class components.",
      },
      {
        id: 2,
        createdAt: new Date(),
        text: "I recommend checking out the React documentation on state management.",
      },
    ],
  },
  {
    id: 2,
    title: "How to handle forms in React?",
    details: "I need help with form handling in my React application.",
    category: "technology",
    createdAt: new Date(),
    modifiedAt: new Date(),
    likes: 8,
    dislikes: 1,
    comments: [
      {
        id: 3,
        createdAt: new Date(),
        text: "You can use controlled components or libraries like Formik for form handling.",
      },
    ],
  },
  {
    id: 3,
    title: "What are React hooks?",
    details:
      "I'm curious about React hooks and how they differ from class components.",
    category: "technology",
    createdAt: new Date(),
    modifiedAt: new Date(),
    likes: 15,
    dislikes: 0,
    comments: [
      {
        id: 4,
        createdAt: new Date(),
        text: "Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class.",
      },
      {
        id: 5,
        createdAt: new Date(),
        text: "They provide a more concise and functional way to work with React components.",
      },
    ],
  },
  {
    id: 4,
    title: "How to fetch data in React?",
    details:
      "I'm looking for the best way to fetch data from an API in a React application.",
    category: "technology",
    createdAt: new Date(),
    modifiedAt: new Date(),
    likes: 12,
    dislikes: 3,
    comments: [
      {
        id: 6,
        createdAt: new Date(),
        text: "You can use the useEffect hook for data fetching in functional components.",
      },
      {
        id: 7,
        createdAt: new Date(),
        text: "Axios is a popular library for making HTTP requests in React.",
      },
    ],
  },
  {
    id: 5,
    title: "How to optimize performance in React?",
    details:
      "I want to improve the performance of my React application. Any tips?",
    category: "technology",
    createdAt: new Date(),
    modifiedAt: new Date(),
    likes: 20,
    dislikes: 1,
    comments: [
      {
        id: 8,
        createdAt: new Date(),
        text: "You can use React.memo for memoizing components and useMemo/useCallback for memoizing values.",
      },
      {
        id: 9,
        createdAt: new Date(),
        text: "Consider lazy loading components and code splitting for better performance.",
      },
    ],
  },
];

export const QuestionsInitialState: QuestionsState = {
  questions: defaultQuestions,
  filteredQuestions: defaultQuestions,
  filters: {},
  searchTerm: "",
};
