import React from 'react'
import { Metadata } from 'next'
import ClientLayout from "./layout";

export const metadata: Metadata = {
    title: "GovWatch",
    description: "GovWatch",
  };

const main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClientLayout>{children}</ClientLayout>
    </div>
  )
}

export default main;