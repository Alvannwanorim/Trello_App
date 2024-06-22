"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrganizationBoards } from "@/lib/queries";
import { Board } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CurrentOrgBoard = () => {
  const { organizationId } = useParams();
  const [boards, setBoards] = useState<Board[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const boards = await getOrganizationBoards(organizationId as string);
      if (boards) {
        setBoards(boards);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [organizationId]);

  if (isLoading) {
    return <CurrentOrgBoard.Skeleton />;
  }
  return (
    <>
      {boards.map((board, index) => (
        <Link
          key={index}
          href={`/organization/${board.orgId}/board/${board?.id}`}
          className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2"
          style={{ backgroundImage: `url(${board.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition">
            <p className="relative font-semibold text-white/70 flex items-center justify-center m-auto h-full">
              {board.title}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

CurrentOrgBoard.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2 bg-muted-foreground/30" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
export default CurrentOrgBoard;
