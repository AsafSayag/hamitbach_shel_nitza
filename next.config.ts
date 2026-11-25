import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // בדיקה מהטלפון ברשת הביתית בזמן פיתוח
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
