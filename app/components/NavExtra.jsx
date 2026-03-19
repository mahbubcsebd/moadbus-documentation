"use client";

import AskAIButton from "./AskAIButton";
import MobileNavMenu from "./MobileNavMenu";
import SearchTriggerButton from "./SearchTriggerButton";
import ThemeToggle from "./ThemeToggle";

export default function NavExtra() {
  return (
    <div className="nav-extra">
      <div className="nav-extra-desktop">
        <a href="#" className="nav-link">
          Status
        </a>
        <a href="#" className="nav-link">
          Blog
        </a>
        <a href="#" className="nav-link">
          Support
        </a>
        <ThemeToggle size={16} />
      </div>

      <div className="nav-extra-mobile">
        {/* <ThemeToggle size={16} /> */}
        <SearchTriggerButton mobile />
        <AskAIButton mobile />
        <MobileNavMenu />
      </div>
    </div>
  );
}
