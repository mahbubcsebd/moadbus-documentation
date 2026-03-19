"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#", label: "Status" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Support" },
];

function DotsIcon() {
  return (
    <svg
      className="h-4 w-4 bg-gray-500 dark:bg-gray-400 hover:bg-gray-600 dark:hover:bg-gray-300"
      style={{
        maskImage: `url("https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/solid/ellipsis-vertical.svg")`,
        maskRepeat: "no-repeat",
        maskPosition: "center center",
      }}
    ></svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="mobile-nav-menu" ref={menuRef}>
      <button
        type="button"
        className="nav-mobile-icon-btn"
        aria-label={open ? "Close menu" : "Open more menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon /> : <DotsIcon />}
      </button>

      {open ? (
        <div className="mobile-nav-menu-panel">
          <div className="mobile-nav-menu-header">
            <button
              type="button"
              className="mobile-nav-menu-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
            <ThemeToggle />
          </div>

          <div className="mobile-nav-menu-links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-menu-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
