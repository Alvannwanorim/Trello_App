"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/context/organization-context";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";

const Info = () => {
  const { currOrg, isLoading } = useOrganization();

  if (isLoading) {
    return <Info.Skeleton />;
  }
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60x] relative">
        <Image
          width={60}
          height={60}
          src={currOrg?.logo ? currOrg?.logo : ""}
          alt="org image"
          className="rounded-md"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{currOrg?.name}</p>
        <div className=" flex items-center justify-center text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          Free
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-4 h-4 mr-2" />
        <Skeleton className="w-[100px] h-4" />
      </div>
    </div>
  );
};

export default Info;
