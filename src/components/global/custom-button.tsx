import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  label: string;
  link: string;
};

const CustomButton = ({ label, link }: Props) => {
  return (
    <>
      <Button
        className="bg-black hover:!bg-slate-200 hover:!text-black dark:!bg-slate-200"
        asChild
      >
        <Link href={link}>{label}</Link>
      </Button>
    </>
  );
};

export default CustomButton;
