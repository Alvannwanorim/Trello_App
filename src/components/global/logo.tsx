import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src={"/logo_.svg"} alt="Logo" height={30} width={30} />
        <p className="text-lg text-neutral-700 dark:text-muted-foreground pb-1">
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
