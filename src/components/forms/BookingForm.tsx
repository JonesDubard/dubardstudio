// Netlify Forms: booking request (Wave A — ADR-0004).
// Honest request + SLA — not a live calendar. Keep fields in sync with public/netlify-forms.html.

import Link from 'next/link';

const WINDOW_OPTIONS = [
  { value: 'morning', label: 'Morning (your local time)' },
  { value: 'afternoon', label: 'Afternoon (your local time)' },
  { value: 'evening', label: 'Evening (your local time)' },
  { value: 'flexible', label: 'Flexible — suggest a few times' },
] as const;

export default function BookingForm({ email }: { email: string }) {
  return (
    <form
      className="contact-form"
      name="booking"
      method="POST"
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="booking" />
      <p className="visually-hidden">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-row">
        <label>
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        <span>Organization</span>
        <input type="text" name="organization" autoComplete="organization" required />
      </label>

      <label>
        <span>Preferred window</span>
        <select name="preferred-window" required defaultValue="">
          <option value="" disabled>
            Select a window
          </option>
          {WINDOW_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>
          Time zone <span className="optional">(optional)</span>
        </span>
        <input
          type="text"
          name="timezone"
          autoComplete="off"
          placeholder="e.g. GMT, EST, WAT"
        />
      </label>

      <label>
        <span>What you want to discuss</span>
        <textarea
          name="discussion"
          rows={4}
          required
          placeholder="Brief context helps us prepare an honest conversation."
        />
      </label>

      <p className="contact-privacy-note">
        This is a consultation request, not an instant calendar hold. We will confirm or propose
        times by email within two business days.{' '}
        <Link href="/privacy/">Privacy</Link>
      </p>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Request a consultation
        </button>
        <a href={`mailto:${email}`} className="btn btn-outline">
          Email directly
        </a>
      </div>
    </form>
  );
}
