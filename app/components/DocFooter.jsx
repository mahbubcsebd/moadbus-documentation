export default function DocFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1c1c1c',
        padding: '2rem 1.5rem',
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 17l10 5 10-5"
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 12l10 5 10-5"
              stroke="#6d5fd4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{ color: '#3f3f46', fontWeight: 600, fontSize: '0.875rem' }}
          >
            MoadBus
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Security'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                color: '#52525b',
                textDecoration: 'none',
                fontSize: '0.8rem',
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <span style={{ color: '#52525b', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} My Docs. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
