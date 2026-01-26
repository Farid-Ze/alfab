export default function Loading() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-foreground/10"></div>
        <div className="absolute inset-2 animate-pulse rounded-full bg-foreground/20"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
