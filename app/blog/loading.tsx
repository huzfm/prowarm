import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div>
      <div className="bg-charcoal-950 pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="container-site space-y-5">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-14 w-full max-w-xl bg-white/10" />
          <Skeleton className="h-6 w-full max-w-2xl bg-white/10" />
        </div>
      </div>
      <div className="container-site py-24">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-3/2 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
