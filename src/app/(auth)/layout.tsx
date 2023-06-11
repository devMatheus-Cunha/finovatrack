import React from 'react';

export default function LayoutAuth({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex h-[100vh] justify-center items-center flex-col gap-6 w-[100%]">
      <h1 className="text-3xl font-bold">
        FinovaTrack
      </h1>
      <div className="sm:w-[70%] lg:w-[55%] xl:w-[36%]">
        {children}
      </div>
    </div>
  );
}
