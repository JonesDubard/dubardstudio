// Netlify Forms: standard POST + redirect to /success/
// Field set matches Verdant website blueprint (qualified inquiry).

import Link from 'next/link';

const HELP_OPTIONS = [
  { value: 'brand', label: 'Brand identity & positioning' },
  { value: 'website', label: 'Website design & development' },
  { value: 'essential-presence', label: 'Essential digital presence' },
  { value: 'standard-presence', label: 'Standard digital presence' },
  { value: 'qa', label: 'Quality assurance (QA)' },
  { value: 'mobile-money', label: 'Mobile Money API (Orange / MTN)' },
  { value: 'workshops', label: 'Workshops & capability building' },
  { value: 'operations', label: 'Operations & systems' },
  { value: 'stewardship', label: 'Ongoing care & stewardship' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export default function ContactForm({ email }: { email: string }) {
  return (
    <form
      className="contact-form"
      name="contact"
      method="POST"
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
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

      <div className="form-row">
        <label>
          <span>Organization</span>
          <input type="text" name="organization" autoComplete="organization" required />
        </label>
        <label>
          <span>Role</span>
          <input type="text" name="role" autoComplete="organization-title" required />
        </label>
      </div>

      <label>
        <span>What you need help with</span>
        <select name="help-with" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {HELP_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Project summary</span>
        <textarea
          name="project-summary"
          rows={5}
          required
          placeholder="What business problem are you trying to solve?"
        />
      </label>

      <div className="form-row">
        <label>
          <span>
            Timeline <span className="optional">(optional)</span>
          </span>
          <input type="text" name="timeline" placeholder="e.g. Next quarter" />
        </label>
        <label>
          <span>
            How you heard about us <span className="optional">(optional)</span>
          </span>
          <input type="text" name="referral" />
        </label>
      </div>

      <fieldset className="form-fieldset">
        <legend>
          Verdant sister enterprise? <span className="optional">(optional)</span>
        </legend>
        <div className="form-radios">
          <label className="form-radio">
            <input type="radio" name="verdant-sister" value="yes" />
            <span>Yes</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="verdant-sister" value="no" />
            <span>No</span>
          </label>
          <label className="form-radio">
            <input type="radio" name="verdant-sister" value="not-sure" />
            <span>Not sure</span>
          </label>
        </div>
      </fieldset>

      <p className="contact-privacy-note">
        By submitting, you agree we may use your details to respond to this inquiry.{' '}
        <Link href="/privacy/">Privacy</Link>
      </p>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Start a conversation
        </button>
        <a href={`mailto:${email}`} className="btn btn-outline">
          Email directly
        </a>
      </div>
    </form>
  );
}
