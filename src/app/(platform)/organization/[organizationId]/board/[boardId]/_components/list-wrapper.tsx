import React from "react";

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shrink-0 h-full w-[272px] select-none">{children}</div>
  );
};

export default ListWrapper;
