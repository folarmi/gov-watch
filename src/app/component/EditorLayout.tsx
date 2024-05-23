// components/SectionLayout.js
import React from "react";
import { editorSideBarItems } from "../data";

const EditorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <section className="bg-green_100 w-1/6 text-white px-8 my-10 mr-8 pt-6 rounded-lg">
        {editorSideBarItems.map(({ id, name }) => {
          return (
            <div key={id}>
              <p className="text-base font-medium pb-11 whitespace-nowrap">
                {name}
              </p>
            </div>
          );
        })}
      </section>
      <main className="w-5/6">{children}</main>
    </div>
  );
};

export default EditorLayout;
