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
        <main className="pt-16 md:pt-34  max-w-6xl 2xl:max-w-screen-xl">
          <div className="flex gap-x-7">
            <div className="w-64 shrink-0 hidden md:block">
              <Sidebar />
            </div>
            {children}
          </div>
        </main>
      </div>
    </OrganizationProvider>
  );
};

export default Layout;
