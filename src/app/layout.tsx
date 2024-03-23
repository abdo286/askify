import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { merriweather } from "@/utility/fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Askify",
  description: `he ultimate platform for anonymous Q&A! Ask questions, receive anonymous answers and comments, and connect with others effortlessly. Filter questions by categories and use our powerful search feature to find what you need. Join Askify today and explore a world of endless curiosity!
`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriweather.className}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
