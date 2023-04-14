import React from 'react';

interface ButtonOption {
 onClick: () => void;
 content: string;
}

interface ButtonGroupProps {
 buttonOptions: ButtonOption[];
}

const ButtonGroup = ({ buttonOptions }: ButtonGroupProps) => {
 return (
  <div className="inline-flex rounded-md shadow-sm" role="group">
   {buttonOptions?.map((item, index) => (
    <React.Fragment key={index}>
     <button
      type="button"
      onClick={item?.onClick}
      className="px-4 py-2 text-sm font-medium  border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
     >
      {item?.content}
     </button>
    </React.Fragment>
   ))}
  </div>
 );
};

export default ButtonGroup;
