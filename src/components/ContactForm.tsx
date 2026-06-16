'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm({ email }: { email: string }) {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (res.ok) {
        showToast('✓ Message sent — I'll get back to you soon!');
        form.reset();
      } else {
        showToast('Something went wrong. Try WhatsApp below.');
      }
    } catch {
      showToast('Something went wrong. Try WhatsApp below.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form
        className="contact-form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Netlify hidden fields */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" style={{ display: 'none' }} />

        <label>
          <span>Name</span>
          <input type="text" name="name" placeholder="Your name" required />
        </label>

        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="your@company.com" required />
        </label>

        <label>
          <span>Message</span>
          <textarea name="message" rows={5} placeholder="Tell me about your project..." required />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending…' : 'Send Message'}
          </button>
          <a href={`mailto:${email}`} className="btn btn-outline">Email directly</a>
        </div>
      </form>

      {toast && <div className="toast" role="alert">{toast}</div>}
    </>
  );
}
