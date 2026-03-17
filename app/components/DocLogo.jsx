export default function DocLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
        style={{
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#ffffff',
          letterSpacing: '-0.01em',
        }}
      >
        MoadBus
      </span>
    </div>
  );
}
