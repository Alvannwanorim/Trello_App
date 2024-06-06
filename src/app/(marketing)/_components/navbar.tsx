import CustomButton from "@/components/global/custom-button";
import Logo from "@/components/global/logo";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white dark:bg-background flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={"/auth/sign-in"}>Login</Link>
          </Button>

          <CustomButton label="Get Taskify for free" link="/auth/sign-up" />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
