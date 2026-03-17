'use client';

import ThemeToggle from './ThemeToggle';

export default function NavExtra() {
  return (
    <div className="nav-extra">
      {/* Ask AI button */}
      <button className="nav-ask-ai-btn">
        ✦ Ask AI
      </button>

      <div className="nav-divider" />

      {/* Nav links */}
      <a href="#" className="nav-link">Status</a>
      <a href="#" className="nav-link">Blog</a>
      <a href="#" className="nav-link">Support</a>

      {/* Theme toggle */}
      <ThemeToggle size={16} />
    </div>
  );
}
