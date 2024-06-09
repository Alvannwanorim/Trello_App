import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Organization, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const OrganizationSwitcher = ({
  organization,
}: {
  organization: Organization;
}) => {
  if (!organization) return null;
  const imgUrl = organization?.logo ? organization?.logo : "";
  const userInitials = organization?.name.slice(0, 2).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex flex-row items-center justify-center w-full border rounded-md p-2">
          <div className="flex flex-row gap-x-2 items-center justify-center">
            <Image src={imgUrl} width={60} height={30} alt="" />
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuItem>
            <div className="flex flex-row w-full items-center justify-start gap-x-2">
              <Image src={imgUrl} width={80} height={20} alt="" />
              <h1>{organization.name}</h1>
            </div>
          </DropdownMenuItem>
          <Link href={`/organization`}>
            <DropdownMenuItem></DropdownMenuItem>
          </Link>
          <Link href={`/setting`}>
            <DropdownMenuItem>Setting</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <Separator />
          <DropdownMenuItem>
            <Button className="w-full rounded-md p-2">Logout </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default OrganizationSwitcher;
