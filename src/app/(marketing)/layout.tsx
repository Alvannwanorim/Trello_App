import { ModeToggle } from "@/components/global/mode-toggle";
import NavBar from "@/components/global/navbar";

type Props = {
  children: React.ReactNode;
};

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-slate-100 dark:bg-background">
      <NavBar />
      <main className="pt-40 pb-20  bg-slate-100 dark:bg-background">
        {children}
        <ModeToggle />
      </main>
    </div>
  );
};

export default MarketingLayout;
