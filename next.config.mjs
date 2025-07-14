/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Esto habilita la exportación estática
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
