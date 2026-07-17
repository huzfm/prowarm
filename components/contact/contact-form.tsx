"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "A short subject helps us route your message"),
  message: z
    .string()
    .trim()
    .min(20, "A few more details (rooms, floor type, city) get you a faster, better answer"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  async function onSubmit(values: ContactValues) {
    try {
      // Simulated send — point this at your API route or form service later.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      toast.success("Message sent — we'll reply within one working day", {
        description: `Thanks ${values.name.split(" ")[0]}, a survey engineer will be in touch at ${values.email}.`,
      });
      reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again, or call us directly — we do pick up.",
      });
    }
  }

  const fieldError = (msg?: string) =>
    msg ? (
      <p role="alert" className="mt-1.5 text-sm text-danger">
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Aisha Sharma"
            aria-invalid={errors.name ? true : undefined}
            className="mt-2"
            {...register("name")}
          />
          {fieldError(errors.name?.message)}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            className="mt-2"
            {...register("email")}
          />
          {fieldError(errors.email?.message)}
        </div>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Heating a 3BHK in Gurugram"
          aria-invalid={errors.subject ? true : undefined}
          className="mt-2"
          {...register("subject")}
        />
        {fieldError(errors.subject?.message)}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell us about the rooms, floor finish and city — or just ask a question."
          aria-invalid={errors.message ? true : undefined}
          className="mt-2"
          {...register("message")}
        />
        {fieldError(errors.message?.message)}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}
