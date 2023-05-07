/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactElement } from 'react';
import ReactLoading from 'react-loading';

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
       <ReactLoading
         type="spinningBubbles"
         color="#13C1ED"
         height={100}
         width={100}
       />
     </div>
   ) : (
     { ...children }
   )
  }
    </>
  );
}
export default Loading;
