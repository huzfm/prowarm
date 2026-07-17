"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";

const emailSchema = z.string().trim().email("Enter a valid email address");

export function NewsletterForm({ id = "newsletter" }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    setPending(true);
    // Simulated subscribe — wire to your ESP endpoint later.
    await new Promise((r) => setTimeout(r, 800));
    setPending(false);
    setEmail("");
    toast.success("You're on the list", {
      description: "Seasonal offers and warm-floor know-how, once a month.",
    });
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border bg-white/5 p-1.5 pl-5 backdrop-blur-sm transition-colors",
          error ? "border-danger" : "border-white/15 focus-within:border-copper-400"
        )}
      >
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe to the newsletter"
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-copper-500 text-white transition-[background-color,transform] duration-300 hover:bg-copper-600 active:scale-95 disabled:opacity-60"
        >
          <ArrowRight className="size-4.5" aria-hidden />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-5 text-sm text-copper-300">
          {error}
        </p>
      )}
    </form>
  );
}
