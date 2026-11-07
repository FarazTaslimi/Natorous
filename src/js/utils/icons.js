/**
 * Inline SVG icon set (stroke-based, inherits currentColor).
 * Adding an icon: append a key with its path markup here, use anywhere
 * via icon("name") in a template string.
 */

const PATHS = {
  mountain:
    '<path d="M3 19 9 7l4 7 3-4 5 9Z" />',
  compass:
    '<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5Z" />',
  globe:
    '<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />',
  users:
    '<circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 5a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />',
  star:
    '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-2.9L6.6 19.7l1.1-6L3.2 9.4l6.1-.8Z" />',
  calendar:
    '<rect x="3.5" y="5" width="17" height="16" rx="3" /><path d="M3.5 10h17M8 2.5V7m8-4.5V7" />',
  clock:
    '<circle cx="12" cy="12" r="9" /><path d="M12 7v5.5l3.5 2" />',
  arrowRight:
    '<path d="M4 12h16m-6.5-6.5L20 12l-6.5 6.5" />',
  arrowUpRight:
    '<path d="M6 18 18 6M9 6h9v9" />',
  play:
    '<path d="M8 5.5v13l11-6.5Z" />',
  check:
    '<path d="m4.5 12.5 5 5 10-11" />',
  quote:
    '<path d="M5 12.5C5 8 8 5.5 11.5 5l.5 1.7c-2 .7-3.2 2-3.4 3.8.9-.4 2.6-.2 3.1 1.3.6 1.7-.5 3.6-2.5 3.6-2.3 0-4.2-1.2-4.2-2.9Zm8.5 0c0-4.5 3-7 6.5-7.5l.5 1.7c-2 .7-3.2 2-3.4 3.8.9-.4 2.6-.2 3.1 1.3.6 1.7-.5 3.6-2.5 3.6-2.3 0-4.2-1.2-4.2-2.9Z" />',
  mail:
    '<rect x="3" y="5.5" width="18" height="13" rx="3" /><path d="m4 7.5 8 6 8-6" />',
  phone:
    '<path d="M5.5 3.5h4l1.5 4.5-2.2 1.6a13 13 0 0 0 5.6 5.6l1.6-2.2 4.5 1.5v4a1.8 1.8 0 0 1-2 1.8A16.8 16.8 0 0 1 3.7 5.5a1.8 1.8 0 0 1 1.8-2Z" />',
  mapPin:
    '<path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.2a6.5 6.5 0 0 1 6.5 6.6C18.5 15.6 12 21 12 21Z" /><circle cx="12" cy="10.5" r="2.3" />',
  send:
    '<path d="m4 11.5 16-7-5 15-3.5-6.5Z" /><path d="M11.5 13 20 4.5" />',
  menu:
    '<path d="M4 7h16M4 12h16M4 17h16" />',
  chevronDown:
    '<path d="m6 9.5 6 6 6-6" />',
  close:
    '<path d="m6 6 12 12M18 6 6 18" />',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />',
  facebook:
    '<path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V12H7.5v3.5H10V21h3.5v-5.5H16l.5-3.5h-3V10a1.5 1.5 0 0 1 1-1.5Z" />',
  youtube:
    '<rect x="2.5" y="6" width="19" height="12.5" rx="3.5" /><path d="m10 9.5 5 2.8-5 2.7Z" />',
  xTwitter:
    '<path d="m4.5 4.5 6 8-6 7h2.6l4.7-5.5 4.2 5.5h4.5l-6.3-8.4 5.7-6.6h-2.6l-4.4 5.1-3.9-5.1Z" />',
  'x-twitter':
    '<path d="m4.5 4.5 6 8-6 7h2.6l4.7-5.5 4.2 5.5h4.5l-6.3-8.4 5.7-6.6h-2.6l-4.4 5.1-3.9-5.1Z" />',
  logo:
    '<path d="M2.5 18.5 9 7l4.2 6.8 2.7-3.6 5.6 8.3" />'
};

export function icon(name, classNames = '') {
  const body = PATHS[name];
  if (!body) {
    console.warn(`[icons] unknown icon: "${name}"`);
    return '';
  }
  return (
    `<svg class="icon ${classNames}" viewBox="0 0 24 24" fill="none" ` +
    `stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ` +
    `stroke-linejoin="round" aria-hidden="true">${body}</svg>`
  );
}
