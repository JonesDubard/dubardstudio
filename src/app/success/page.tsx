import Link from 'next/link';
import { getSettings } from '@/lib/content';

export const metadata = { title: 'Message Sent — Dubard Studio' };

export default function SuccessPage() {
  const settings = getSettings();
  const waMessage = encodeURIComponent(`Hi Dubard! I just sent you a message via your site.`);
  const waLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${waMessage}`;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Message Sent!</h1>
        <p>
          Thanks for reaching out. I'll get back to you within 24 hours.<br />
          For a faster response, send me a message on WhatsApp.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={waLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Message on WhatsApp
          </a>
          <Link href="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
