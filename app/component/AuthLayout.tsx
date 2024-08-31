// /components/AuthLayout.tsx

import Image from 'next/image';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  text: string;
  header: string;
  img: string;
  banner: string;
  headerMarginTop?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, text, header, banner, img, headerMarginTop }) => {
  return (
    <div className="flex justify-center gap-16 py-10">
      <div
        className="w-1/3 min-h-full bg-cover bg-center relative rounded-3xl hidden lg:block"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary bg-opacity-75 rounded-3xl">
          <div className="mt-6 ml-7">
            <Image src={img} alt="logo" width={70} height={70} />
          </div>
          <h1 className="font-bold text-3xl px-7" style={{ marginTop: headerMarginTop || '13rem' }}>
            {header}
          </h1>
          <p className="text-sm px-7 font-semibold">
            {text}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
