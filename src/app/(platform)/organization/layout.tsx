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
        <main className="flex w-full mt-14">
          <div className=" w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5">{children}</div>
        </main>
      </div>
    </OrganizationProvider>
  );
};

export default Layout;
