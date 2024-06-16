"use client";
import { useOrganization } from "@/context/organization-context";
import React from "react";

const Info = () => {
  const { currOrg } = useOrganization();
  console.log(currOrg);

  return <div>Info</div>;
};

export default Info;
