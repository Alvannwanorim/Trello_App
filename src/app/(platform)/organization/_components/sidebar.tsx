"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser, currentUserOrg } from "@/lib/auth";
import { Organization, User } from "@prisma/client";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ChevronFirst, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
interface SidebarProps {
  storageKey?: string;
}
const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [activeOrg, setActiveOrg] = useState<Organization | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const org = await currentUserOrg();
      const user = await currentUser();
      if (org) {
        setActiveOrg(org);
      }
      if (user) {
        setUser(user);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  let imgUrl;
  let userInitials;
  if (user) {
    imgUrl = user?.image ? user?.image : "";
    userInitials =
      user?.first_name.slice(0, 1).toUpperCase() +
      user?.last_name.slice(0, 1).toUpperCase();
  }
  if (isLoading) {
    return <Skeleton />;
  }

  if (!activeOrg) {
    return null;
  }
  return (
    <>
      <aside className="h-screen ">
        <nav className="h-full flex-col border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image
              src={activeOrg?.logo ? activeOrg.logo : ""}
              alt=""
              width={120}
              height={30}
            />
            <Button variant={"ghost"} className="rounded-lg ">
              <ChevronFirst className="h-4 w-4" />
            </Button>
          </div>
          <ul className="flex-1 px-3">{/* children */}</ul>
          <div
            className="border-t flex p-3
          "
          >
            <Avatar>
              <AvatarImage src={`${imgUrl}`} />
              <AvatarFallback className="">{`${userInitials}`}</AvatarFallback>
            </Avatar>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
