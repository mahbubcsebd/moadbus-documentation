"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AskAIButton from "./AskAIButton";
import ChatModal from "./ChatModal";
import MobileNavMenu from "./MobileNavMenu";
import SearchTriggerButton from "./SearchTriggerButton";
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
      <div className="nav-extra-desktop">
        <Link href="#" className="nav-link">
          Status
        </Link>
        <Link href="#" className="nav-link">
          Blog
        </Link>
        <Link href="#" className="nav-link">
          Support
        </Link>
        <ThemeToggle size={16} />
      </div>

      <div className="nav-extra-mobile">
        <SearchTriggerButton mobile />
        <AskAIButton mobile />
        <MobileNavMenu />
      </div>

      {/* Chat Modal Layer */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
