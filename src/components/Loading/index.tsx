/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import React, { ReactElement } from 'react';

export type StatusRequestProps = 'idle' | 'error' | 'loading' | 'success';

interface LoadingProps {
 children: ReactElement;
 loading?: boolean;
}

function Loading({
  children, loading,
}: LoadingProps) {
  return (
    <>
      {
   loading ? (
     <div className="flex h-screen w-full items-center justify-center">
       oi
     </div>
   ) : (
     { ...children }
   )
  }
    </>
  );
}
export default Loading;
