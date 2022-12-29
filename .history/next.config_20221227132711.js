/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'https://res.cloudinary.com/see-sight-tours/image/upload/w_1920,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP'
    ]
  }
};

module.exports = nextConfig;
