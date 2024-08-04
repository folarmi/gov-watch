import React from "react";

const AuthLayout = ({
  children,
  headerText,
}: Readonly<{
  children: React.ReactNode;
  headerText: string;
}>) => {
  return (
    <div className="flex">
      <p>s fb dhhb</p>
      <p>{headerText}</p>
      <main className="w-auto">{children}</main>
    </div>
  );
};

export default AuthLayout;
