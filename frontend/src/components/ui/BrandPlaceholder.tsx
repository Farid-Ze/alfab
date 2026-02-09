import { cn } from "@/lib/utils";
import { type Brand } from "@/lib/mock-data";

interface BrandPlaceholderProps {
    brand: Brand;
    className?: string;
}

export function BrandPlaceholder({ brand, className }: BrandPlaceholderProps) {
    return (
        <div className={cn(
            "w-full h-full bg-neutral-200 rounded flex flex-col items-center justify-center text-neutral-400 font-bold text-xs p-2 text-center transition-all",
            "group-hover:bg-white group-hover:shadow-lg group-hover:text-primary-600",
            className
        )}>
            {/* Logic: if logo exists (path), use Image. For now use text placeholder */}
            <span>{brand.name}</span>
            <span className="text-[10px] font-normal mt-1 block opacity-70">
                ({brand.origin})
            </span>
        </div>
    );
}
