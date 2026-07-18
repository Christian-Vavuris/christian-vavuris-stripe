"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const SUGGESTED_QUESTIONS = [
  "What are Christian's top three qualifications as an Account Executive candidate at Stripe?",
  "Walk me through Christian's role in the Mercury relationship while at Synapse. What does it show about how he would be successful at Stripe?",
  "How has Christian used cross-platform intelligence to create new opportunities from an existing book?",
  "How would Christian create new opportunities at target accounts that don't yet have a relationship with Stripe — and what deals from his past demonstrate that approach?",
  "Stripe's enterprise buyers are CTOs, Founders, Product Professionals, and Executives. How does Christian earn credibility with these personas?",
  "How does Christian account for the incentives of partner banks — or Stripe when utilizing its own licenses — when structuring embedded finance deals?",
];

type DisplayMessage = { role: "user" | "assistant"; content: string };

function StripeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="25"
      viewBox="0 0 60 25"
      aria-label="Stripe logo"
      className="h-6 w-auto"
    >
      <path
        fill="#635BFF"
        fillRule="evenodd"
        d="M59.6444 14.2813h-8.062c.1843 1.9296 1.5983 2.5476 3.2032 2.5476 1.6352 0 2.9534-.3656 4.0453-.9506v3.3179c-1.1186.7115-2.5964 1.1068-4.5645 1.1068-4.011 0-6.8218-2.5122-6.8218-7.4783 0-4.19441 2.3837-7.52509 6.3017-7.52509 3.912 0 5.9537 3.28038 5.9537 7.49819 0 .3982-.0372 1.261-.0556 1.4835Zm-5.9241-5.62407c-1.0294 0-2.1739.72812-2.1739 2.58387h4.2573c0-1.85362-1.0721-2.58387-2.0834-2.58387ZM40.9547 20.303c-1.4411 0-2.322-.6087-2.9133-1.0417l-.0088 4.6271-4.1181.8755-.0014-19.19053h3.7543l.0864 1.01784c.6035-.52914 1.6114-1.29157 3.2256-1.29162 2.8925 0 5.6162 2.6052 5.6162 7.39971 0 5.2327-2.6948 7.6037-5.6409 7.6037Zm-.959-11.35573c-.9453 0-1.5376.34559-1.9669.81586l.0245 6.11967c.3997.433.9763.7813 1.9424.7813 1.5231 0 2.5437-1.6575 2.5437-3.8745 0-2.1544-1.037-3.84233-2.5437-3.84233Zm-11.7602-3.3739h4.1341V20.0088h-4.1341V5.57337Zm0-4.694699L32.3696 0v3.35821l-4.1341.87868V.878671ZM23.9198 10.2223v9.7861h-4.1156V5.57296h3.6867l.1317 1.21751c1.0035-1.7722 3.0722-1.41321 3.6209-1.21594v3.78524c-.5242-.16908-2.2894-.42779-3.3237.86253Zm-8.5525 4.7221c0 2.4275 2.5988 1.6719 3.1263 1.4609v3.3522c-.5492.3013-1.5437.5458-2.8901.5458-2.4441 0-4.2773-1.7999-4.2773-4.2379l.0173-13.17658 4.0206-.85464.0032 3.5395h3.1278V9.0857h-3.1278v5.8588-.0001Zm-4.9069.7026c0 2.9645-2.31051 4.6562-5.73464 4.6562-1.41958 0-2.92289-.2761-4.453935-.9347v-3.9319c1.382085.7516 3.093705 1.315 4.457755 1.315.91864 0 1.53106-.2459 1.53106-1.0069C6.26064 13.7786 0 14.5192 0 9.95995 0 7.04457 2.27622 5.2998 5.61655 5.2998c1.36404 0 2.72806.20934 4.09208.75351V9.9317c-1.25265-.67618-2.84332-1.05979-4.09588-1.05979-.86296 0-1.44753.24965-1.44753.8924.0001 1.85329 6.29518.97249 6.29518 5.88279v-.0001Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
      <StripeLogo />

      <h1 className="mb-8 mt-4 text-3xl font-bold text-[#0a2540] sm:text-4xl">
        Christian Vavuris, Account Executive Candidate at Stripe
      </h1>

      <div className="text-[17px] leading-[1.75] text-slate-700">
        <p className="mb-[18px]">
          I&apos;m{" "}
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#635bff] underline underline-offset-2 hover:text-[#4b45c6]"
          >
            Christian Vavuris
          </a>
          , an account executive with 10+ years selling embedded financial
          technology products to businesses of all sizes.
        </p>
        <p className="mb-[18px]">
          This AI Cover Letter is built to help Stripe teams quickly
          understand my qualifications as a candidate for Account Executive
          roles. Use the text box below to ask any questions you&apos;d like
          about my background and qualifications.
        </p>
        <p>
          Here is a copy of my{" "}
          <a
            href="https://drive.google.com/file/d/15KOYS1W8pQ7i_ET4DvBvUUBihsVg5hBG/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#635bff] underline underline-offset-2 hover:text-[#4b45c6]"
          >
            resume
          </a>
          , and at the bottom of the page are some example questions you can
          use to get started.
        </p>
      </div>

      <div className="mt-8 rounded-md border border-slate-200 bg-white shadow-sm">
        {(messages.length > 0 || loading) && (
          <div className="max-h-[420px] overflow-y-auto p-5 sm:p-6">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <p
                  key={i}
                  ref={i === messages.length - 1 ? latestQuestionRef : undefined}
                  className={`scroll-mt-4 text-[16px] font-bold text-[#0a2540] ${
                    i === 0 ? "" : "mt-6 border-t border-slate-200 pt-6"
                  }`}
                >
                  {m.content}
                </p>
              ) : (
                <div
                  key={i}
                  className="mt-3 space-y-3 text-[16px] leading-[1.75] text-slate-700 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_strong]:font-bold [&_strong]:text-[#0a2540] [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                >
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              )
            )}
            {loading && (
              <p className="mt-3 text-[16px] text-slate-400">Thinking…</p>
            )}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className={`flex items-center gap-3 p-4 ${
            messages.length > 0 || loading ? "border-t border-slate-200" : ""
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about Christian…"
            disabled={loading}
            className="flex-1 bg-transparent text-[16px] text-[#0a2540] placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="text-[15px] font-bold text-[#635bff] hover:text-[#4b45c6] disabled:text-slate-300"
          >
            Send
          </button>
        </form>
      </div>

      <p className="mt-2.5 text-[12px] text-slate-500">
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
            className={`group flex items-start gap-2 border-t border-slate-200 px-2 py-2.5 text-left text-[15px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#635bff] disabled:opacity-50 ${
              i === SUGGESTED_QUESTIONS.length - 1 ? "border-b" : ""
            }`}
          >
            <span
              aria-hidden
              className="mt-0.5 shrink-0 text-slate-400 transition-colors group-hover:text-[#635bff]"
            >
              →
            </span>
            <span>{q}</span>
          </button>
        ))}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 text-[15px] text-slate-600">
        <p>
          <a
            href="mailto:cvavuris@gmail.com"
            className="text-[#635bff] underline underline-offset-2 hover:text-[#4b45c6]"
          >
            cvavuris@gmail.com
          </a>
        </p>
        <p className="mt-1">
          <a
            href="tel:+14152464384"
            className="text-[#635bff] underline underline-offset-2 hover:text-[#4b45c6]"
          >
            1-415-246-4384
          </a>
        </p>
        <p className="mt-1">
          <a
            href="https://www.linkedin.com/in/cvavuris/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#635bff] underline underline-offset-2 hover:text-[#4b45c6]"
          >
            linkedin.com/in/cvavuris
          </a>
        </p>
      </div>
    </main>
  );
}
