import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baked Growth',
    short_name: 'Baked',
    description: 'Simplifier la vie des gens et les connecter ensemble.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#F7A500',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
