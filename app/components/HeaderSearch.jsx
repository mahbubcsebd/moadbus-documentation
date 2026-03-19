"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ─── Pagefind Integration ─────────────────────────────────────────────────────
let pagefind = null;

async function loadPagefind() {
  if (pagefind) return pagefind;
  try {
    // Pagefind is generated at build time inside /_next/... or /pagefind
    pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
    await pagefind.init();
  } catch {
    pagefind = null;
  }
  return pagefind;
}

// ─── Search Icons ─────────────────────────────────────────────────────────────
function SearchIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PageIcon({ size = 14 }) {
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
      style={{ flexShrink: 0, opacity: 0.5 }}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const searchTimer = useRef(null);

  // Open / close helpers
  const openModal = useCallback(() => {
    setOpen(true);
    loadPagefind(); // warm up
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        open ? closeModal() : openModal();
      }
      if (e.key === "Escape" && open) closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, openModal, closeModal]);

  // Keyboard nav inside modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        window.location.href = results[activeIndex].url;
        closeModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, closeModal]);

  // Search with Pagefind
  const runSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const pf = await loadPagefind();
    if (!pf) {
      setLoading(false);
      return;
    }
    const raw = await pf.search(q);
    const data = await Promise.all(
      raw.results.slice(0, 8).map((r) => r.data()),
    );
    setResults(
      data.map((item) => ({
        url: item.url,
        title: item.meta?.title || item.url,
        excerpt: item.excerpt || "",
      })),
    );
    setActiveIndex(0);
    setLoading(false);
  }, []);

  // Debounce input
  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => runSearch(q), 220);
  };

  // Scroll active result into view
  useEffect(() => {
    const el = resultsRef.current?.children[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", gap: "15px" }}>
      {/* Trigger button in the navbar */}
      <button
        onClick={openModal}
        aria-label="Search documentation (Ctrl+K)"
        className="docs-search-trigger"
      >
        <SearchIcon size={14} />
        <span style={{ flex: 1, textAlign: "left" }}>Search...</span>
        <kbd>⌘K</kbd>
      </button>
      {/* Ask AI button */}
      <button className="nav-ask-ai-btn">✦ Ask AI</button>

      {/* Modal */}
      {open && (
        <div className="docs-search-overlay" onClick={closeModal}>
          <div
            className="docs-search-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* Input row */}
            <div className="docs-search-input-row">
              <SearchIcon size={16} color="#71717a" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleInput}
                placeholder="Search documentation..."
                aria-label="Search query"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd className="docs-search-esc-key" onClick={closeModal}>
                Esc
              </kbd>
            </div>

            {/* Results area */}
            <div className="docs-search-results" ref={resultsRef}>
              {/* Loading */}
              {loading && <div className="docs-search-empty">Searching...</div>}

              {/* Empty state */}
              {!loading && !query && (
                <div className="docs-search-empty">
                  Type to search pages and headings…
                </div>
              )}

              {/* No results */}
              {!loading && query && results.length === 0 && (
                <div className="docs-search-empty">
                  No results for &ldquo;<strong>{query}</strong>&rdquo;
                </div>
              )}

              {/* Results */}
              {!loading && results.length > 0 && (
                <>
                  <div className="docs-search-section-label">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </div>
                  {results.map((r, i) => (
                    <a
                      key={r.url}
                      href={r.url}
                      className="docs-search-result-item"
                      style={
                        i === activeIndex
                          ? {
                              background: "var(--nextra-bg)",
                              borderLeftColor: "#667eea",
                            }
                          : {}
                      }
                      onClick={closeModal}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <span className="docs-search-result-title">
                        <PageIcon />
                        &nbsp;
                        <span dangerouslySetInnerHTML={{ __html: r.title }} />
                      </span>
                      {r.excerpt && (
                        <span
                          className="docs-search-result-excerpt"
                          dangerouslySetInnerHTML={{ __html: r.excerpt }}
                        />
                      )}
                    </a>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
