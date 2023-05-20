import React from 'react';

export default function LayoutAuth({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex h-[100vh] justify-center items-center flex-col gap-10">
      <h1 className="text-3xl font-bold">
        FinovaTrack
      </h1>
      {children}
    </div>
  );
}
