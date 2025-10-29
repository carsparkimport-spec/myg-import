'use client'; // Mark as a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current path
import { useI18n } from '@/i18n/I18nProvider';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos Véhicules', href: '/stock' },
  { name: 'Enchères passées', href: '/encheres' },
  { name: 'Importation', href: '/importation' },
  { name: 'Simulateur', href: '/simulateur' },
  { name: 'À Propos', href: '/a-propos' },
  { name: 'Blog', href: '/blog' },
];

const Navigation = () => {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="flex flex-nowrap items-center space-x-6 overflow-x-auto text-[16px]">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const key = link.name === 'Accueil' ? 'home' : link.name === 'Nos Véhicules' ? 'stock' : link.name === 'Enchères passées' ? 'auctions' : link.name === 'Importation' ? 'import' : link.name === 'Simulateur' ? 'sim' : link.name === 'À Propos' ? 'about' : 'blog';
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`inline-flex items-center h-10 px-4 rounded-md text-base font-semibold text-white hover:text-red-600 transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-red-600 underline underline-offset-4 decoration-red-600' : ''}`}>
            {t(`nav.${key}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation; 
