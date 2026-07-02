"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED_QUESTIONS = [
  "What are Christian's top three qualifications for the role?",
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
  const latestQuestionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (messages[messages.length - 1]?.role === "user") {
      latestQuestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

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
      setError("Something went wrong reaching the AI Cover Letter. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:py-20">
      <h1 className="mb-8 text-3xl font-bold text-stone-900 sm:text-4xl">
        Christian Vavuris, Candidate for Growth AE, Stripe Platform
      </h1>

      <div className="text-[17px] leading-[1.75] text-stone-800">
        <p className="mb-[18px]">
          I&apos;m{" "}
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            Christian Vavuris
          </a>
          , an account executive with 10+ years selling embedded financial
          technology products to businesses of all sizes.
        </p>
        <p className="mb-[18px]">
          This AI Cover Letter is built to help the Stripe team quickly
          understand my qualifications for the Account Executive role. Use
          the text box below to ask any questions you&apos;d like about my
          background and qualifications.
        </p>
        <p>
          Here is a copy of my{" "}
          <a
            href="https://drive.google.com/file/d/15KOYS1W8pQ7i_ET4DvBvUUBihsVg5hBG/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            resume
          </a>
          , and at the bottom of the page are some example questions you can
          use to get started.
        </p>
      </div>

      <div className="mt-8 rounded-md border border-stone-300 bg-[#fdfbf6]">
        {(messages.length > 0 || loading) && (
          <div className="max-h-[420px] overflow-y-auto p-5 sm:p-6">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <p
                  key={i}
                  ref={i === messages.length - 1 ? latestQuestionRef : undefined}
                  className={`scroll-mt-4 text-[16px] font-bold text-stone-900 ${
                    i === 0 ? "" : "mt-6 border-t border-stone-200 pt-6"
                  }`}
                >
                  {m.content}
                </p>
              ) : (
                <div
                  key={i}
                  className="mt-3 space-y-3 text-[16px] leading-[1.75] text-stone-700 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_strong]:font-bold [&_strong]:text-stone-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              )
            )}
            {loading && (
              <p className="mt-3 text-[16px] text-stone-400">Thinking…</p>
            )}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className={`flex items-center gap-3 p-4 ${
            messages.length > 0 || loading ? "border-t border-stone-300" : ""
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Christian…"
            disabled={loading}
            className="flex-1 bg-transparent text-[16px] text-stone-900 placeholder:text-stone-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-[15px] font-bold text-amber-800 hover:text-amber-900 disabled:text-stone-300"
          >
            Send
          </button>
        </form>
      </div>

      <p className="mt-2.5 text-[12px] text-stone-500">
        AI Cover Letter answering on Christian&apos;s behalf, based on
        information he&apos;s provided.
      </p>

      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

      <div className="mt-12 flex flex-col">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={q}
            type="button"
            onClick={() => sendMessage(q)}
            disabled={loading}
            className={`flex items-start gap-2 border-t border-stone-300 py-2.5 text-left text-[15px] text-stone-600 hover:text-stone-900 disabled:opacity-50 ${
              i === SUGGESTED_QUESTIONS.length - 1 ? "border-b" : ""
            }`}
          >
            <span aria-hidden className="mt-0.5 shrink-0 text-stone-400">
              →
            </span>
            <span>{q}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 border-t border-stone-300 pt-6 text-[15px] text-stone-600">
        <p>
          <a
            href="mailto:cvavuris@gmail.com"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            cvavuris@gmail.com
          </a>
        </p>
        <p className="mt-1">
          <a
            href="tel:+14152464384"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            1-415-246-4384
          </a>
        </p>
        <p className="mt-1">
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline underline-offset-2 hover:text-amber-900"
          >
            linkedin.com/in/cvavuris
          </a>
        </p>
      </div>
    </main>
  );
}
