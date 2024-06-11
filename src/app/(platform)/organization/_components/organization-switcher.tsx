import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Organization } from "@prisma/client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useOrganization } from "@/context/organization-context";

const OrganizationSwitcher = ({
  organization,
  organizations,
}: {
  organization: Organization;
  organizations: Organization[];
}) => {
  const { changeOrg } = useOrganization();

  if (!organization) return null;
  const imgUrl = organization?.logo ? organization?.logo : "";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none flex flex-row items-center justify-center w-full border rounded-md p-2">
          <div className="flex flex-row gap-x-2 items-center justify-center">
            <Image src={imgUrl} width={60} height={30} alt="" />
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] flex flex-col gap-y-2">
          {organizations.map((org, index) => (
            <DropdownMenuItem key={index}>
              <div
                className="flex flex-row w-full items-center justify-start gap-x-3"
                onClick={() => changeOrg(org.id)}
              >
                <Image src={org.logo} width={80} height={20} alt="" />
                <h1 className="text-accent font-normal">{org.name}</h1>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default OrganizationSwitcher;
