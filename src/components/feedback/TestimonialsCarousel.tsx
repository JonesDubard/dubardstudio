'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Testimonial } from '@/lib/content';

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % items.length);
  }, [items.length]);

  const prev = () => setCurrent(c => (c - 1 + items.length) % items.length);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, reduceMotion, items.length]);

  if (!items.length) return null;

  return (
    <div className="testimonials-track">
      {items.map((item, i) => (
        <div
          key={item.name}
          className={`testimonial-card ${i === current ? 'is-active' : ''}`}
          aria-hidden={i !== current}
        >
          <div className="quote-mark" aria-hidden="true">
            &ldquo;
          </div>
          <p className="testimonial-quote">{item.quote}</p>
          <div className="testimonial-author">
            {item.photo ? (
              <Image src={item.photo} alt="" width={44} height={44} className="author-photo" />
            ) : (
              <div className="author-photo-placeholder" aria-hidden="true">
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

      <div className="testimonial-controls">
        <button type="button" onClick={prev} aria-label="Previous testimonial">
          ◀
        </button>
        <div className="testimonial-dots" role="tablist" aria-label="Choose testimonial">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={`testimonial-dot ${i === current ? 'is-active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial from ${item.name}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next testimonial">
          ▶
        </button>
      </div>
    </div>
  );
}
