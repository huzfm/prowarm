import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-charcoal-950 text-white">
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 size-150 -translate-x-1/2 rounded-full bg-copper-500/20 blur-3xl"
      />
      <div className="container-site relative py-40 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-copper-500/15 text-copper-400">
          <Flame className="size-8" aria-hidden />
        </span>
        <p className="mt-8 text-eyebrow text-copper-400">Error 404</p>
        <h1 className="mt-4 text-display-1">This room isn&apos;t heated.</h1>
        <p className="mx-auto mt-6 max-w-md text-lead text-white/60">
          The page you&apos;re after has moved, or never existed. Let&apos;s get
          you back somewhere warm.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft aria-hidden />
              Back to the warmth
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
