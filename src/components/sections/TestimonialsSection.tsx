import TestimonialsCarousel from '@/components/feedback/TestimonialsCarousel';
import type { Testimonial } from '@/lib/content';

type TestimonialsSectionProps = {
  items: Testimonial[];
};

export default function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="section" aria-labelledby="testimonialsHeading">
      <div className="container">
        <span className="section-label">Social Proof</span>
        <h2 id="testimonialsHeading" className="section-title">
          Client Stories
        </h2>
        <p className="section-desc">Don&apos;t just take our word for it.</p>
        <TestimonialsCarousel items={items} />
      </div>
    </section>
  );
}
