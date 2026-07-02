"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED_QUESTIONS = [
  "Walk me through Christian's role in the Mercury relationship while at Synapse. What does it show about how he would be successful in this role at Stripe?",
  "How has Christian used cross-platform intelligence to create new opportunities from an existing book?",
  "Stripe's platform buyers are CTOs and Founders. How does Christian earn credibility with those personas?",
  "Why is Christian genuinely excited about this role — and what market shifts does he see driving demand for Stripe Platforms over the next decade?",
  "How does Christian account for the incentives of partner banks — or Stripe when utilizing its own licenses — when selling platform deals?",
];

type DisplayMessage = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");

    const nextMessages: DisplayMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" },
      ]);
    } catch {
      setError("Something went wrong reaching the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12 sm:py-20">
      <div className="text-[16px] leading-[1.75] text-neutral-900">
        <p className="mb-[18px]">
          I&apos;m{" "}
          <a
            href="https://www.linkedin.com/in/cvavuris/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
          >
            Christian Vavuris
          </a>
          , an account executive with 10+ years selling embedded financial
          technology products to businesses of all sizes.
        </p>
        <p className="mb-[18px]">
          This assistant is built to help the Stripe team quickly understand
          why I&apos;m an outstanding fit for the Account Executive,
          Platforms, Grower role. It&apos;s designed to give a faster, more
          complete signal than a cover letter alone — so you can evaluate my
          candidacy efficiently.
        </p>
        <p className="mb-2.5">Here are my top three qualifications:</p>
        <ul className="mb-[18px] list-disc space-y-2.5 pl-5">
          <li>
            <span className="font-medium">I&apos;ve run this exact motion.</span>{" "}
            At Synapse I sold API-enabled financial infrastructure to software
            platforms — same product, same buyer — as the #1 AE, managing and
            growing a named account list over four-plus years.
          </li>
          <li>
            <span className="font-medium">
              I have a demonstrated growth track record.
            </span>{" "}
            At Taxbit I took Gemini from $120K to $1.3M in a single year by
            surfacing an opportunity they hadn&apos;t asked for — the instinct
            this role calls for, not just execution against inbound requests.
          </li>
          <li>
            <span className="font-medium">
              I&apos;m a two-time founder who used Stripe both times.
            </span>{" "}
            Its approach to solving problems, and its mission to facilitate
            online entrepreneurs, resonates deeply with me.
          </li>
        </ul>
        <p>
          Here are copies of my{" "}
          <a
            href="https://drive.google.com/file/d/1TY_cj7xUcgJr9IPMShBT2f4QdTQaR-dY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
          >
            resume
          </a>{" "}
          and{" "}
          <a
            href="https://drive.google.com/file/d/11m9dvCzZZWsubq0a_hTfkRJtgxbEScP_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
          >
            cover letter
          </a>
          . Ask anything — a few to start with are below.
        </p>
      </div>

      <div className="my-8 flex flex-col">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={q}
            type="button"
            onClick={() => sendMessage(q)}
            disabled={loading}
            className={`flex items-start gap-2 border-t border-neutral-200 py-2.5 text-left text-[14px] text-neutral-600 hover:text-neutral-900 disabled:opacity-50 ${
              i === SUGGESTED_QUESTIONS.length - 1 ? "border-b" : ""
            }`}
          >
            <span aria-hidden className="mt-0.5 shrink-0 text-neutral-400">
              →
            </span>
            <span>{q}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex items-center gap-3 border-b-2 border-neutral-800 pb-2.5"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Christian…"
          disabled={loading}
          className="flex-1 bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="text-[14px] font-medium text-indigo-600 hover:text-indigo-700 disabled:text-neutral-300"
        >
          Send
        </button>
      </form>
      <p className="mt-2.5 text-[11px] text-neutral-400">
        AI assistant answering on Christian&apos;s behalf, based on
        information he&apos;s provided.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {messages.length > 0 && (
        <div className="mt-10 border-t border-neutral-200 pt-2">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <p
                key={i}
                className={`text-[15px] font-medium text-neutral-900 ${
                  i === 0 ? "pt-6" : "mt-6 border-t border-neutral-200 pt-6"
                }`}
              >
                {m.content}
              </p>
            ) : (
              <div
                key={i}
                className="mt-3 space-y-3 text-[15px] leading-[1.75] text-neutral-600 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-neutral-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            )
          )}
          {loading && (
            <p className="mt-3 text-[15px] text-neutral-400">Thinking…</p>
          )}
        </div>
      )}
    </main>
  );
}
