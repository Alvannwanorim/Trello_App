import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "../ui/sheet";
import Sidebar from "@/app/(platform)/organization/_components/sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"} className="block md:hidden">
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
