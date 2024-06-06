import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const UserButton = ({ user }: { user: User }) => {
  const imgUrl = user?.image ? user?.image : "";
  const userInitials =
    user?.first_name.slice(0, 1).toUpperCase() +
    user?.last_name.slice(0, 1).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar>
            <AvatarImage src={`${imgUrl}`} />
            <AvatarFallback className="">{`${userInitials}`}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/user/profile"}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href={`/organization`}>
            <DropdownMenuItem>Organization</DropdownMenuItem>
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

export default UserButton;
