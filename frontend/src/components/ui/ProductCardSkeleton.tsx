import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
    className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
    return (
        <div className={cn("card overflow-hidden h-full flex flex-col", className)}>
            <div className="aspect-[4/5] w-full bg-neutral-200 animate-pulse" />
            <div className="p-4 flex flex-col flex-1 gap-3">
                <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-neutral-100 rounded w-1/2 animate-pulse" />
                <div className="mt-auto pt-4 flex gap-2">
                    <div className="h-8 bg-neutral-200 rounded w-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}
