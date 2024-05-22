import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "./component/Header";
import Footer from "./component/Footer";
import QueryClientContextProvider from "./lib/QueryClientContextProvider";
import ExploreButton from "./component/ExploreButton";
import ThemeToogle from "./component/ThemeToggle";

// const inter = Inter({ subsets: ["latin"] });
const inter = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GovWatch",
  description: "GovWatch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <QueryClientContextProvider>
          <ThemeProvider attribute="class">
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </QueryClientContextProvider>
        {/* <ThemeToogle /> */}
        <ExploreButton />
      </body>
    </html>
  );
}
