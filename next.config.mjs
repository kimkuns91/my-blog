/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'rgvzlonuavmjvodmalpd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
