export function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SpotifyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.18.28-.5.44-.84.44-.2 0-.39-.06-.56-.17-1.82-1.1-4.08-1.35-6.28-.93-.3.06-.6-.14-.66-.44-.06-.3.14-.6.44-.66 2.48-.46 5.02-.19 7.1 1.06.25.15.37.47.22.72l.58-.02zm1.25-2.71c-.22.34-.6.52-.98.52-.22 0-.44-.07-.62-.2-2.12-1.28-4.76-1.63-7.35-1.12-.38.07-.76-.17-.83-.55-.07-.38.17-.76.55-.83 2.89-.57 5.82-.18 8.2 1.26.34.2.47.64.28.98l.75-.06zm.08-2.82c-2.52-1.49-5.69-1.83-8.62-1.24-.45.09-.9-.2-.99-.65-.09-.45.2-.9.65-.99 3.26-.65 6.75-.27 9.59 1.44.4.24.54.76.3 1.16-.24.4-.76.54-1.16.3l.23-.02z" />
    </svg>
  );
}
