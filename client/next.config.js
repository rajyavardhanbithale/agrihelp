/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    images: {
        domains: [
            "5.imimg.com", "api.website.com",
        ],
    },
    output: "standalone",



}

module.exports = nextConfig
