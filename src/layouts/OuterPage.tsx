/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { Header } from "../component/Header";
import Footer from "../component/Footer";

interface LayoutProps {
  children: ReactNode;
  resetState?: any;
}

const OuterPage: React.FC<LayoutProps> = ({ children, resetState }) => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Header resetState={resetState} />
      {children}
      <Footer />
    </div>
  );
};

export default OuterPage;
