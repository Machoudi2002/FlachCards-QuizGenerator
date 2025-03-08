/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['pdf2json'], // Add the AWS SDK Textract package to the Server Components external package
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Set the body size limit for Server Actions
    },
  },
};

module.exports = nextConfig;