import React from "react";
import { ListWithCards } from "../../../../../../../../types";
import ListHeader from "./list-header";
interface ListItemProps {
  index: number;
  data: ListWithCards;
}
const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <div className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] dark:bg-background dark:border-muted dark:border  shadow-md pb-2">
        <ListHeader list={data} />
      </div>
    </div>
  );
};

export default ListItem;
