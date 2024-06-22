import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <h2 className="text-destructive/90 text-xl">Board not found</h2>
      <Button variant={"link"}>
        <Link href={"/organization"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
