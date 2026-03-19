'use client';

export default function CustomNavbar() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#0a0a0a',
        borderBottom: '1px solid #1c1c1c',
        padding: '0 1.5rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7l10 5 10-5-10-5z"
            stroke="#667eea"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M2 17l10 5 10-5"
            stroke="#667eea"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M2 12l10 5 10-5"
            stroke="#5268d6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#fff',
            letterSpacing: '-0.01em',
          }}
        >
          think4ever
        </span>
      </a>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: '320px',
          margin: '0 2rem',
          position: 'relative',
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '6px 12px 6px 36px',
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#d4d4d8',
            fontSize: '0.875rem',
            outline: 'none',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#52525b',
            fontSize: '0.8rem',
          }}
        >
          ⌕
        </span>
        <span
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#3f3f46',
            fontSize: '0.7rem',
            background: '#1c1c1c',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            padding: '1px 5px',
          }}
        >
          Ctrl K
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <a
          href="#"
          style={{
            color: '#71717a',
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Status
        </a>
        <a
          href="#"
          style={{
            color: '#71717a',
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Blog
        </a>
        <a
          href="#"
          style={{
            color: '#71717a',
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          Support
        </a>
        <div style={{ width: '1px', height: '16px', background: '#2a2a2a' }} />
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            background: '#161616',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            color: '#667eea',
            fontSize: '0.8rem',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          ✦ Ask AI
        </a>
      </div>
    </nav>
  );
}
