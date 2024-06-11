"use client";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import OrganizationSwitcher from "./organization-switcher";
import { currentUser, currentUserOrg } from "@/lib/auth";
import UserButton from "@/components/global/user-button";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Organization, User } from "@prisma/client";
import CustomModal from "./custom-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/context/organization-context";
import MobileSidebar from "@/components/global/mobile-sidebar";

const NavBar = () => {
  const { organizations, user, currOrg, isLoading } = useOrganization();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {}, [refresh]);

  if (isLoading) {
    return (
      <div className="w-full bg-accent">
        <Skeleton className="w-full animate " />
      </div>
    );
  }

  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-background flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          variant={"link"}
          size={"sm"}
          className="rounded-sm hidden md:block h-auto py-1.5 px-2  text-neutral-700 dark:text-muted-foreground"
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
        <CustomModal setRefresh={setRefresh} />
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {currOrg ? (
          <OrganizationSwitcher
            organization={currOrg}
            organizations={organizations}
          />
        ) : (
          user && <UserButton user={user} />
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
