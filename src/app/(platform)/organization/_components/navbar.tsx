import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import OrganizationSwitcher from "./organization-switcher";
import { currentUser, currentUserOrg } from "@/lib/auth";
import UserButton from "@/components/global/user-button";

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
          size={"sm"}
          className="rounded-sm hidden md:block h-auto py-1.5 px-2"
        >
          Create
        </Button>
        <Button size={"sm"} className="rounded-sm block md:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center pap-x-2">
        {userOrg ? (
          <OrganizationSwitcher organization={userOrg} />
        ) : (
          user && <UserButton user={user} />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
