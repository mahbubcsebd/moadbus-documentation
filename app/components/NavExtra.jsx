"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ChatModal from "./ChatModal";
import ThemeToggle from "./ThemeToggle";

export default function NavExtra() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsChatOpen(true);
    window.addEventListener("open-ask-ai", handleOpen);
    return () => window.removeEventListener("open-ask-ai", handleOpen);
  }, []);

  return (
    <div className="nav-extra">
      {/* Ask AI button */}
      {/* <button
        className="nav-ask-ai-btn"
        onClick={() => setIsChatOpen(true)}
      >
        ✦ Ask AI
      </button> */}

      <div className="nav-divider" />

      {/* Nav links */}
      <Link href="#" className="nav-link">
        Status
      </Link>
      <Link href="#" className="nav-link">
        Blog
      </Link>
      <Link href="#" className="nav-link">
        Support
      </Link>

      {/* Theme toggle */}
      <ThemeToggle size={16} />

      {/* Chat Modal Layer */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
