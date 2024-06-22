import React from "react";
import { ImSpinner2 } from "react-icons/im";
const Loading = () => {
  return (
    <div className="flex items-center w-full h-screen">
      <ImSpinner2 className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default Loading;
