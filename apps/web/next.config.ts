import type { NextConfig } from 'next';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  transpilePackages: ['@globalpay/shared'],
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath,
        assetPrefix: basePath ? `${basePath}/` : undefined
      }
    : {})
};

export default nextConfig;
