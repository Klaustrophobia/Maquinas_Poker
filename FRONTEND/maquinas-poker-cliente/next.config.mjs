/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {  // Comenta o elimina esta línea si no usas server actions
  //   serverActions: true  // Esto estaba causando el error
  // },
  // O si realmente necesitas serverActions:
  experimental: {
    serverActions: {
      enabled: true
    }
  }
}

export default nextConfig