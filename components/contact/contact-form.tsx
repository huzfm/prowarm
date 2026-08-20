"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LocationField } from "@/components/contact/location-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pinnedLocationMessage } from "@/lib/geo";

const placeSchema = z.object({
  customerAddress: z.string().min(1),
  customerLat: z.number(),
  customerLng: z.number(),
  location: z.string().min(1),
  googleMapsLink: z.string(),
});

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name"),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[\d\s()-]{7,20}$/,
      "Enter a valid phone number we can reach you on"
    ),
  place: placeSchema
    .nullable()
    .refine((place): place is z.infer<typeof placeSchema> => place !== null, {
      message: "Share or search your location",
    }),
});

/** The form holds `place: null` until one is picked; validation narrows it. */
type ContactInput = z.input<typeof contactSchema>;
type ContactValues = z.output<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", place: null },
  });

  async function onSubmit(values: ContactValues) {
    const place = values.place!;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          ...place,
          message: pinnedLocationMessage(place),
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      toast.success("Thanks — we have your location", {
        description: `We'll call ${values.phone.trim()} within one working day to book your survey.`,
      });
      reset({ name: "", phone: "", place: null });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again, or call us directly — we do pick up.",
      });
    }
  }

  const fieldError = (msg?: string, id?: string) =>
    msg ? (
      <p id={id} role="alert" className="mt-1.5 text-sm text-danger">
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
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98110 40040"
            aria-invalid={errors.phone ? true : undefined}
            className="mt-2"
            {...register("phone")}
          />
          {fieldError(errors.phone?.message)}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-charcoal-800">Location</p>
        <p className="mt-1 text-sm text-charcoal-400">
          Detect it automatically, or search for the address — either way we send
          the exact pin to the survey team.
        </p>
        <div className="mt-3">
          <Controller
            control={control}
            name="place"
            render={({ field }) => (
              <LocationField
                value={field.value}
                onChange={(place) => {
                  field.onChange(place);
                  field.onBlur();
                }}
                invalid={Boolean(errors.place)}
                describedBy={errors.place ? "place-error" : undefined}
              />
            )}
          />
        </div>
        {fieldError(errors.place?.message, "place-error")}
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
