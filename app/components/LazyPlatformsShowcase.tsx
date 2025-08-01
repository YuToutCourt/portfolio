'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Lazy load du composant PlatformsShowcase pour améliorer les performances
const PlatformsShowcase = dynamic(() => import('./PlatformsShowcase'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>Chargement des plateformes...</span>
      </div>
    </div>
  ),
  ssr: false // Désactiver le SSR pour ce composant lourd
});

export default PlatformsShowcase;