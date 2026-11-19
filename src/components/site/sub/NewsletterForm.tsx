"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { SITE } from "@/lib/site";

/**
 * "Join us" sign-up. There is no mailing-list service behind this demo, so the form opens the visitor's
 * mail app addressed to the hotel. Swap `handleSubmit` for a real endpoint when one exists.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    const subject = encodeURIComponent("Newsletter sign-up");
    const body = encodeURIComponent(`Please add ${value} to the ${SITE.name} newsletter.`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setMessage("Opening your email app to complete the sign-up…");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md">
      <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-[color:var(--ts-canvas)]/60">
        Email
      </label>
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
          className="min-w-0 flex-1 rounded-full border-[1px] border-white/20 bg-white/10 px-6 py-3.5 text-sm text-[color:var(--ts-canvas)] outline-none backdrop-blur transition-colors placeholder:text-[color:var(--ts-canvas)]/40 focus:border-[color:var(--ts-accent)]"
        />
        <GlowButton icon={Send} type="submit">
          Sign up
        </GlowButton>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm text-[color:var(--ts-canvas)]/75">
        {message}
      </p>
    </form>
  );
}
