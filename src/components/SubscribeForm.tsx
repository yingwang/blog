"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const stored = localStorage.getItem("blog-subscribers");
      const subscribers: string[] = stored ? JSON.parse(stored) : [];

      if (subscribers.includes(email.toLowerCase())) {
        setStatus("success");
        setMessage("You're already subscribed!");
        return;
      }

      subscribers.push(email.toLowerCase());
      localStorage.setItem("blog-subscribers", JSON.stringify(subscribers));

      setStatus("success");
      setMessage("Thanks for subscribing! You'll hear from me soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="subscribe" className="bg-primary-600 py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="mb-3 text-3xl font-bold text-white">Stay Updated</h2>
        <p className="mb-8 text-primary-100">
          Subscribe to get notified when I publish new posts. No spam, ever.
        </p>

        {status === "success" ? (
          <div className="rounded-lg bg-white/20 p-4 text-white">
            <svg
              className="mx-auto mb-2 h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-70"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-200">{message}</p>
        )}
      </div>
    </section>
  );
}
