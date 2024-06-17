"use client";
import { currentUser, currentUserOrgs } from "@/lib/auth";
import { getOrganizationBoards } from "@/lib/queries";
import { Board, Organization, User } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
type OrganizationContextType = {
  organizations: Organization[] | [];
  user: User | null;
  currOrg: Organization | null;
  changeOrg: (id: string) => void;
  updateCurrOrgBoards: (id: string) => void;
  currOrgBoards: Board[] | [];
  isLoading: boolean;
};
interface OrganizationProviderProps {
  children: React.ReactNode;
}

const organizationContext = createContext<OrganizationContextType>({
  organizations: [],
  user: null,
  currOrg: null,
  changeOrg: (id: string) => {},
  updateCurrOrgBoards: (id: string) => {},
  currOrgBoards: [],
  isLoading: false,
});

const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<Organization[] | []>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currOrg, setCurrOrg] = useState<Organization | null>(null);
  const [currOrgBoards, setCurrOrgBoards] = useState<Board[] | []>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(true);
    const fetchData = async () => {
      const user = await currentUser();
      const organizations = await currentUserOrgs();

      if (user) setUser(user);
      if (organizations) setOrganizations(organizations);

      if (organizations && organizations?.length > 0) {
        setCurrOrg(organizations[0]);
        await updateCurrOrgBoards(organizations[0].id);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const changeOrg = async (id: string) => {
    if (organizations) {
      const org = organizations.find((org) => org.id === id);
      if (org) setCurrOrg(org);
    }
  };
  const updateCurrOrgBoards = async (id: string) => {
    const boards = await getOrganizationBoards(id);
    setCurrOrgBoards(boards);
  };

  return (
    <organizationContext.Provider
      value={{
        organizations,
        user,
        currOrg,
        changeOrg,
        isLoading,
        updateCurrOrgBoards,
        currOrgBoards,
      }}
    >
      {children}
    </organizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(organizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must ne used within the OrganizationProvider"
    );
  }

  return context;
};

export default OrganizationProvider;
