/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
    webpack: (config) => {
        config.resolve.symlinks = false;
        return config;
    },
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ['mjml'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/en',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
module.exports = withImages(nextConfig);
