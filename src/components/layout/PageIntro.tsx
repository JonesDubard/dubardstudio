type PageIntroProps = {
  label?: string;
  title: string;
  description?: string;
  titleId?: string;
};

/** Shared page header — transitional IA chrome (Phase 2). */
export default function PageIntro({
  label,
  title,
  description,
  titleId = 'page-title',
}: PageIntroProps) {
  return (
    <header className="page-intro container">
      {label && <span className="section-label">{label}</span>}
      <h1 id={titleId} className="section-title page-intro-title">
        {title}
      </h1>
      {description && <p className="section-desc page-intro-desc">{description}</p>}
    </header>
  );
}
