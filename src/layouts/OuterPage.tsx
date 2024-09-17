import React, { ReactNode } from "react";
import { Header } from "../component/Header";
import Footer from "../component/Footer";

interface LayoutProps {
  children: ReactNode;
}

const OuterPage: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default OuterPage;
