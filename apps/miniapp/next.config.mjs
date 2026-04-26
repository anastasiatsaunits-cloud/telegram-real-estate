import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: repoRoot,
  images: {
    deviceSizes: [375, 430, 640, 750, 828, 960, 1080, 1200],
    qualities: [68, 75],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'новостройки93.рф' },
      { protocol: 'https', hostname: 'xn--93-dlcyegsibavln.xn--p1ai' },
      { protocol: 'https', hostname: 'новостройкикрым.рф' },
      { protocol: 'https', hostname: 'xn--b1amdcqydjib4b.xn--p1ai' },
      { protocol: 'https', hostname: 'flathouse-svc.ru' },
    ],
  },
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
