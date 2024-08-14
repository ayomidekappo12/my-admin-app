import React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface UserDetailsSkeletonProps {
  className?: string;
}

const UserDetailsSkeleton = ({ className }: UserDetailsSkeletonProps) => {
  return (
    <div className={cn("p-4 bg-white shadow rounded-lg", className)}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-1/2 bg-gray-200 rounded-lg mb-2" />
          <Skeleton className="h-4 w-1/3 bg-gray-200 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full bg-gray-200 rounded-lg" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 rounded-lg" />
        <Skeleton className="h-4 w-2/3 bg-gray-200 rounded-lg" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 rounded-lg" />
      </div>
      <div className="mt-6 space-y-4">
        <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
        <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export default UserDetailsSkeleton;
