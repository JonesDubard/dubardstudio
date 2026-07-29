import Image from 'next/image';
import type { Testimonial } from '@/lib/content';

type Props = {
  items: Testimonial[];
};

/**
 * Static client quotes. No auto-rotate (design-direction carousel policy).
 */
export default function TestimonialsList({ items }: Props) {
  if (!items.length) return null;

  return (
    <ul className="quote-list">
      {items.map(item => (
        <li key={item.name} className="quote-item">
          <blockquote className="quote-block">
            <p className="quote-text">&ldquo;{item.quote}&rdquo;</p>
            <footer className="quote-footer">
              {item.photo && (
                <Image
                  src={item.photo}
                  alt=""
                  width={48}
                  height={48}
                  className="quote-photo"
                />
              )}
              <div>
                <cite className="quote-name">{item.name}</cite>
                {item.role && <p className="quote-role">{item.role}</p>}
              </div>
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  );
}
