"use client";

function SparkleIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
    </svg>
  );
}

export default function AskAIButton({ mobile = false }) {
  return (
    <button
      type="button"
      className={mobile ? "nav-mobile-icon-btn" : "nav-ask-ai-btn"}
      aria-label="Ask AI"
      title="Ask AI"
    >
      {mobile ? (
        <SparkleIcon size={17} />
      ) : (
        <>
          <SparkleIcon size={14} />
          <span>Ask AI</span>
        </>
      )}
    </button>
  );
}
