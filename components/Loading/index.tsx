import React, { ReactElement } from "react";
import ReactLoading from "react-loading";

export type StatusRequestProps = "idle" | "error" | "loading" | "success";

interface LoadingProps {
 status?: StatusRequestProps;
 refetch?: any;
 children: ReactElement;
 loading?: boolean;
}

type ValidateContent = Pick<LoadingProps, "status">;

const Loading = ({ status, refetch, children, loading }: LoadingProps) => {
 // const validateContent = ({ status: type }: ValidateContent) => {
 //  const statusArr: any = {
 //   success: { ...children },
 //   loading: (
 //    <div className="flex h-screen w-full items-center justify-center">
 //     <ReactLoading
 //      type="spinningBubbles"
 //      color="#13C1ED"
 //      height={100}
 //      width={100}
 //     />
 //    </div>
 //   ),
 //  };
 //  return statusArr[type];
 // };

 return (
  <>
  {
   loading  ? (
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
};
export default Loading;
