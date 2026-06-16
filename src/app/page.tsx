import Image from 'next/image';
import { getSettings, getProjects, getTestimonials, getServices, type Service } from '@/lib/content';
import Header from '@/components/Header';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ContactForm from '@/components/ContactForm';
import BackToTop from '@/components/BackToTop';

export default async function Home() {
  const settings = getSettings();
  const projects = getProjects();
  const testimonials = getTestimonials();
  const services = getServices();

  const waMessage = encodeURIComponent(
    `Hi Dubard! I visited your portfolio and I'd like to discuss a project.`
  );
  const waLink = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${waMessage}`;

  return (
    <>
      <Header tagline={settings.tagline} />

      <main>
        {/* ── HERO ──────────────────────────────────────── */}
        <section className="hero" id="home" tabIndex={-1}>
          <div className="container hero-inner">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                Available for new projects
              </div>
              <h1 className="hero-headline">
                {/* ADD CONTENT: Update hero headline in content/settings.json */}
                Web Designer<br />& <em>Developer</em>
              </h1>
              <p className="hero-lead">{settings.heroSubheadline}</p>
              <div className="hero-ctas">
                <a href="#work" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-outline">Get in Touch</a>
              </div>
            </div>

            {settings.heroImage && (
              <div className="hero-image">
                {/* ADD CONTENT: Replace hero image in content/settings.json → heroImage */}
                <Image
                  src={settings.heroImage}
                  alt="Website mockup"
                  width={380}
                  height={280}
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* ── ABOUT ─────────────────────────────────────── */}
        <section className="about" id="about" aria-labelledby="aboutHeading">
          <div className="container about-inner">
            <div className="about-photo-wrap">
              {/* ADD CONTENT: Replace profile photo in content/settings.json → profilePhoto */}
              <Image
                src={settings.profilePhoto}
                alt={`Dubard Jones — Web Designer & Developer`}
                width={280}
                height={360}
                className="about-photo"
                priority
              />
            </div>

            <div className="about-content">
              <span className="section-label">Our Story</span>
              <h2 id="aboutHeading">Crafting Digital Experiences</h2>
              <p className="about-name">Hello, We are <strong>Dubard Studio</strong></p>

              <p className="about-copy">{settings.aboutPara1}</p>
              {settings.aboutPara2 && (
                <p className="about-copy">{settings.aboutPara2}</p>
              )}

              {/* ADD CONTENT: Update stats to reflect your real numbers */}
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects Delivered</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>

              <div className="about-actions">
                {settings.cvFile && (
                  <a href={settings.cvFile} className="btn btn-primary" download>
                    Download Our Company Profile
                  </a>
                )}
                <a href="#contact" className="btn btn-outline">Work with us</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────── */}
        <section id="services" className="section-services" aria-labelledby="servicesHeading">
          <div className="container">
            <span className="section-label">What We Do</span>
            <h2 id="servicesHeading" className="section-title">Services</h2>
            <p className="section-desc">Solutions tailored for small businesses, NGOs and startups.</p>

            <div className="services-grid">
            {services.map((service: Service) => (
                <article key={service.title} className="service-card" tabIndex={0}>
                  <div className="service-icon">
                    {/* ADD CONTENT: Place icon images in /public/images/icons/ */}
                    <img
                      src={`/images/Icons/${service.icon}`}
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p className="service-tagline">{service.tagline}</p>
                  </div>
                  <ul className="service-items">
                    {service.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="service-cta">
                    <a href="#contact">Get Started →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────── */}
        <section id="work" className="projects" aria-labelledby="workHeading">
          <div className="container">
            <span className="section-label">Portfolio</span>
            <h2 id="workHeading" className="section-title">Selected Work</h2>
            <p className="section-desc">Recent projects across web design, development, and WordPress.</p>

            <div className="projects-grid">
              {projects.map(project => (
                <article key={project.slug} className="project-card">
                  <div className="project-image-wrap">
                    {/* ADD CONTENT: Add project screenshots to /public/images/ */}
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      width={480}
                      height={300}
                    />
                    <span className="project-badge">{project.category}</span>
                  </div>
                  <div className="project-body">
                    <span className="project-timeline">{project.timeline}</span>
                    <h4>{project.title}</h4>
                    <p className="project-desc">{project.description}</p>
                    {project.tech && (
                      <p className="project-tech">{project.tech}</p>
                    )}
                    <a
                      href={project.url}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View project →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────── */}
        <section id="testimonials" className="section" aria-labelledby="testimonialsHeading">
          <div className="container">
            <span className="section-label">Social Proof</span>
            <h2 id="testimonialsHeading" className="section-title">Client Stories</h2>
            <p className="section-desc">Don't just take our word for it.</p>

            {/* ADD CONTENT: Add/edit testimonials in content/testimonials/ */}
            <TestimonialsCarousel items={testimonials} />
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────── */}
        <section id="contact" className="section" aria-labelledby="contactHeading">
          <div className="container">
            <span className="section-label">Let's Talk</span>
            <h2 id="contactHeading" className="section-title">Get in Touch</h2>
            <p className="section-desc" style={{ marginBottom: '36px' }}>
              Have a project in mind? We'd love to hear from you.
            </p>

            <div className="contact-inner">
              <ContactForm email={settings.email} />

              <aside className="contact-card" aria-label="Contact details">
                <h4>Contact Details</h4>
                <div className="contact-info-row">
                  <div className="contact-info-item">
                    <span className="label">Email</span>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                  <div className="contact-info-item">
                    <span className="label">Location</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{settings.location}</span>
                  </div>
                </div>

                {/* WhatsApp CTA — primary follow-up channel */}
                {/* ADD CONTENT: Update WhatsApp number in content/settings.json */}
                <a href={waLink} className="whatsapp-cta" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.857L.057 23.571l5.853-1.534A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.359-.213-3.73.978.994-3.641-.234-.374A9.818 9.818 0 1112 21.818z"/>
                  </svg>
                  Message on WhatsApp
                </a>

                <div className="social-links">
                  {settings.linkedin && (
                    <a href={settings.linkedin} className="social-link" target="_blank" rel="noopener" aria-label="LinkedIn">
                      <img src="/images/Icons/linkedin.png" alt="LinkedIn" />
                    </a>
                  )}
                  <a href={waLink} className="social-link" target="_blank" rel="noopener" aria-label="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.857L.057 23.571l5.853-1.534A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.359-.213-3.73.978.994-3.641-.234-.374A9.818 9.818 0 1112 21.818z"/>
                    </svg>
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Dubard Studio — Built by us</p>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
