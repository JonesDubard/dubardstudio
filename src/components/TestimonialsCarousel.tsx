'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/content';

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, [items.length]);

  const prev = () => setCurrent(c => (c - 1 + items.length) % items.length);

  // Auto-rotate every 6s
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  if (!items.length) return null;

  return (
    <div className="testimonials-track">
      {items.map((item, i) => (
        <div
          key={item.name}
          className={`testimonial-card ${i === current ? 'is-active' : ''}`}
          aria-hidden={i !== current}
        >
          <div className="quote-mark" aria-hidden>&ldquo;</div>
          <p className="testimonial-quote">{item.quote}</p>
          <div className="testimonial-author">
            {item.photo ? (
              <Image
                src={item.photo}
                alt={item.name}
                width={44}
                height={44}
                className="author-photo"
              />
            ) : (
              <div className="author-photo-placeholder" aria-hidden>
                {item.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="author-name">{item.name}</div>
              {item.role && <div className="author-role">{item.role}</div>}
            </div>
          </div>
        </div>
      ))}

      <div className="testimonial-controls" aria-label="Carousel navigation">
        <button onClick={prev} aria-label="Previous testimonial">◀</button>
        <div className="testimonial-dots" aria-hidden>
          {items.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next testimonial">▶</button>
      </div>
    </div>
  );
}
