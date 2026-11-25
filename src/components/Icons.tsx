type P = { className?: string };

export function WhatsAppIcon({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24ZM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.76 2.67 4.25 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.37-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43l-.48-.01Z" />
    </svg>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FactIcon({ name, className }: P & { name: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      {name === "kosher" && (
        <>
          <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6l-7-3Z" />
          <path d="m9 12 2.2 2.2L15.2 10" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
          <path d="M8 3.5v4M16 3.5v4M4 10.5h16" />
          <path d="M12 17.2c-1.6-1-2.6-1.9-2.6-3a1.4 1.4 0 0 1 2.6-.7 1.4 1.4 0 0 1 2.6.7c0 1.1-1 2-2.6 3Z" />
        </>
      )}
      {name === "pin" && (
        <>
          <path d="M12 21s6.5-5.6 6.5-11A6.5 6.5 0 0 0 5.500 10c0 5.400 6.500 11 6.500 11Z" />
          <circle cx="12" cy="10" r="2.4" />
        </>
      )}
      {name === "pick" && (
        <>
          <path d="M12 20.3c-4.5-3.1-7.5-5.900-7.500-9.400A4.200 4.200 0 0 1 12 8.400a4.200 4.200 0 0 1 7.500 2.500c0 3.500-3 6.300-7.500 9.400Z" />
        </>
      )}
      {name === "chat" && (
        <>
          <path d="M5 5.500h14a1.500 1.500 0 0 1 1.500 1.500v8.500A1.500 1.500 0 0 1 19 17h-6.500L8 20.500V17H5a1.500 1.500 0 0 1-1.500-1.500V7A1.500 1.500 0 0 1 5 5.500Z" />
          <path d="M8 10h8M8 13h5" />
        </>
      )}
      {name === "bag" && (
        <>
          <path d="M5.500 8.500h13l-1 11.500h-11l-1-11.500Z" />
          <path d="M9 8.500V7a3 3 0 0 1 6 0v1.500" />
        </>
      )}
      {name === "truck" && (
        <>
          <path d="M3 7.500h10.500v8.500H3zM13.500 10.500h3.700L20.500 13.500V16h-7" />
          <circle cx="7.500" cy="17.500" r="1.800" />
          <circle cx="16.800" cy="17.500" r="1.800" />
        </>
      )}
    </svg>
  );
}

export function Heart({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 20.500c-4.700-3.300-8-6.200-8-9.900A4.400 4.400 0 0 1 12 8a4.400 4.400 0 0 1 8 2.600c0 3.700-3.300 6.600-8 9.900Z" />
    </svg>
  );
}

export function Sparkle({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.6 4.900 2.900 7.300 8 8-5.100.7-7.400 3.100-8 8-.6-4.900-2.900-7.300-8-8 5.100-.7 7.400-3.100 8-8Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.200" cy="6.800" r="0.600" fill="currentColor" />
    </svg>
  );
}
