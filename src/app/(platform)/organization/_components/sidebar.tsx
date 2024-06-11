"use client";
import { Accordion } from "@/components/ui/accordion";
import { useOrganization } from "@/context/organization-context";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";
import NavItem from "./nav-item";
import { string } from "zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface SidebarProps {
  storageKey?: string;
}
const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const { organizations, user, currOrg, isLoading } = useOrganization();
  const [expended, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const ids = organizations.map((org) => org.id);

  const defaultAccordionValue: string[] = Object.keys(expended).reduce(
    (acc: string[], key: string) => {
      if (expended[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );
  const onExpand = (id: string) => {
    setExpanded((cur) => ({
      ...cur,
      [id]: !expended[id],
    }));
  };
  console.log(defaultAccordionValue);

  return (
    <>
      <div className="h-screen border-r">
        <div className=" flex items-center justify-between ">
          <h1 className="font-semibold text-lg p-2 text-neutral-700 dark:text-muted-foreground">
            Workspace
          </h1>
          <Button variant={"link"}>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="p-2">
          <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="w-full"
          >
            {organizations.map((org, index) => (
              <NavItem
                organization={org}
                key={index}
                isActive={currOrg?.id === org.id}
                isExpanded={expended[org.id]}
                onExpand={onExpand}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
