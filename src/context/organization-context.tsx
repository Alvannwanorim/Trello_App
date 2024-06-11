"use client";
import { currentUser, currentUserOrgs } from "@/lib/auth";
import { Organization, User } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
type OrganizationContextType = {
  organizations: Organization[] | [];
  user: User | null;
  currOrg: Organization | null;
  changeOrg: (id: string) => void;
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
  isLoading: false,
});

const OrganizationProvider: React.FC<OrganizationProviderProps> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<Organization[] | []>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currOrg, setCurrOrg] = useState<Organization | null>(null);
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
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const changeOrg = (id: string) => {
    if (organizations) {
      const org = organizations.find((org) => org.id === id);
      if (org) setCurrOrg(org);
    }
  };

  return (
    <organizationContext.Provider
      value={{ organizations, user, currOrg, changeOrg, isLoading }}
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
