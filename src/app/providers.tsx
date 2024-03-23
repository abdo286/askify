"use client";

import { QuestionsContextProvider } from "../contexts/QuestionsContext";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QuestionsContextProvider>{children}</QuestionsContextProvider>;
};
export default Providers;
