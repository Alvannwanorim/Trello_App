import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import OrganizationSwitcher from "./organization-switcher";
import { currentUser, currentUserOrg } from "@/lib/auth";
import UserButton from "@/components/global/user-button";
import { ModeToggle } from "@/components/global/mode-toggle";
import dynamic from "next/dynamic";

const CustomModal = dynamic(() => import("./custom-modal"), { ssr: false });
const NavBar = async () => {
  const userOrg = await currentUserOrg();
  const user = await currentUser();
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-background flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          variant={"link"}
          size={"sm"}
          className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          id="create-button"
        >
          Create
        </Button>

        <Button
          variant={"link"}
          size={"sm"}
          className="rounded-sm block md:hidden"
          id="plus-button"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <CustomModal />
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {userOrg ? (
          <OrganizationSwitcher organization={userOrg} />
        ) : (
          user && <UserButton user={user} />
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
