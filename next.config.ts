import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      hmrRefreshes: true
    }
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
