import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YùToutCourt - Portfolio Cybersécurité',
    short_name: 'YùToutCourt',
    description: 'Portfolio de YùToutCourt - Spécialiste en cybersécurité, DevSecOps, Pentesting et Red Team',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      }
    ],
  }
}