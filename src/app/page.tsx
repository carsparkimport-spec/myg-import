"use client";
import VerticalSelector from '@/components/VerticalSelector';

export default function Home() {
  // Toujours afficher le sélecteur d'entrée; plus de redirection automatique basée sur un cookie
  return <VerticalSelector />;
}
