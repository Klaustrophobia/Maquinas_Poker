//** @type {import('next').NextConfig} */
//const nextConfig = {
  // experimental: {  // Comenta o elimina esta línea si no usas server actions
  //   serverActions: true  // Esto estaba causando el error
  // },
  // O si realmente necesitas serverActions:
  //experimental: {
    //serverActions: {
      //enabled: true
   // }
  //}
//}

//export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {} // Activadas sin propiedades extra
    serverActions: {
      enabled: true
    }
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src')
    };
    return config;
  }
}

export default nextConfig;