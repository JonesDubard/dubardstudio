import { Plus_Jakarta_Sans, DM_Mono, Syne } from 'next/font/google';

/** Display / brand moments — expressive, durable (not Inter/system). */
export const fontDisplay = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display-family',
  display: 'swap',
});

/** Body / UI — highly readable for long pages and forms. */
export const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body-family',
  display: 'swap',
});

/** Labels / meta — sparse overlines and chrome. */
export const fontMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-family',
  display: 'swap',
});
