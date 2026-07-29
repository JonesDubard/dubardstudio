import Image from 'next/image';

type BrandLogoProps = {
  /** Accessible name when logo is the sole content of a link */
  alt?: string;
  /** Compact header mark vs larger hero treatment */
  size?: 'header' | 'hero';
  className?: string;
  /** When true, show text fallback only (no image) */
  textOnly?: boolean;
  /** Site title from CMS */
  title?: string;
};

const LOGO_SRC = '/brand/dubard-studio-logo.png';

/**
 * Official wordmark. Logo lives at public/brand/dubard-studio-logo.png.
 * Swap the file to update brand asset without code changes.
 */
export default function BrandLogo({
  alt = 'Dubard Studio',
  size = 'header',
  className = '',
  textOnly = false,
  title = 'Dubard Studio',
}: BrandLogoProps) {
  if (textOnly) {
    return <span className={`brand-text ${className}`.trim()}>{title}</span>;
  }

  const dims =
    size === 'hero'
      ? { width: 320, height: 93, className: 'brand-logo brand-logo--hero' }
      : { width: 168, height: 49, className: 'brand-logo brand-logo--header' };

  return (
    <Image
      src={LOGO_SRC}
      alt={alt}
      width={dims.width}
      height={dims.height}
      className={`${dims.className} ${className}`.trim()}
      priority={size === 'header' || size === 'hero'}
    />
  );
}
