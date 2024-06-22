import OrganizationProvider from "@/context/organization-context";
import NavBar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <OrganizationProvider>
      <div className="h-screen bg-slate-100 dark:bg-background">
        <NavBar />
        <div className="pt-[3.5rem] md:pt-34 ">
          <div className="flex w-full">
            <div className="w-60 flex-none hidden md:block">
              <Sidebar />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </OrganizationProvider>
  );
};

export default Layout;
