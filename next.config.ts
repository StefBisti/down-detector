import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones on the LAN to use the dev server (update if the Mac's IP changes)
  allowedDevOrigins: ["192.168.100.85"],
};

export default nextConfig;
