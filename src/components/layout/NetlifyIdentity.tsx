'use client';

import Script from 'next/script';

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, cb: (user?: unknown) => void) => void;
      open: () => void;
    };
  }
}

/**
 * Loads Netlify Identity on production so invite / recovery hash tokens
 * (`#invite_token=…`, `#recovery_token=…`) open the password modal on any page.
 * Without this, invite emails land on `/` and appear to do nothing.
 */
export default function NetlifyIdentity() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const identity = window.netlifyIdentity;
        if (!identity) return;

        identity.on('init', user => {
          if (!user) {
            identity.on('login', () => {
              document.location.href = '/admin/';
            });
          }
        });
      }}
    />
  );
}
