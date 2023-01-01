/** @type {import('next').NextConfig} */

const withReactSvg = require('next-react-svg');
const path = require('path');
module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config;
  }
});

const nextConfig = {

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

module.exports = nextConfig;
