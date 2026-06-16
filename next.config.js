/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify/Vercel
  output: 'export', 
  trailingSlash: true,// Uncomment this line if deploying to static host (Netlify drag-and-drop)
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
