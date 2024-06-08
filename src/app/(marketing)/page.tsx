import CustomButton from "@/components/global/custom-button";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div
      className={cn(
        "flex justify-center items-center flex-col",
        poppins.className
      )}
    >
      <div className={"flex items-center justify-center flex-col"}>
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 dark:text-white">
          Taskify help team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
          work forward
        </div>
      </div>
      <div className="text-sm md:text-xl text-neutral-400 dark:text-muted-foreground mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish at all with Taskify.
      </div>
      <div className="mt-3">
        <CustomButton label="Get Taskify for free" link="organization" />
      </div>
    </div>
  );
};

export default MarketingPage;
