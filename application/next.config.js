/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
    webpack: (config) => {
        config.resolve.symlinks = false;
        return config;
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
module.exports = withImages(nextConfig);
