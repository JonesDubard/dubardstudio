// No 'use client' needed — this is now a plain server-rendered form
// Netlify Forms works with a standard POST action + redirect to /success

export default function ContactForm({ email }: { email: string }) {
  return (
    <form
      className="contact-form"
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: 'none' }}>
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

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
        <button type="submit" className="btn btn-primary">Send Message</button>
        <a href={`mailto:${email}`} className="btn btn-outline">Email directly</a>
      </div>
    </form>
  );
}