import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Organization, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

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
        <DropdownMenuTrigger className="focus:outline-none flex flex-row">
          <Avatar>
            <AvatarImage src={`${imgUrl}`} />
            <AvatarFallback className="">{`${userInitials}`}</AvatarFallback>
          </Avatar>
          <Label>{organization.name}</Label>
          <span className="flex flex-col">
            <ChevronDown />
            <ChevronUp />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuSeparator />
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
