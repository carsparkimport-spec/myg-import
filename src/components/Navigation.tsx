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
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';
  const brand = firstSegment === 'myg' || firstSegment === 'car-spark' ? firstSegment : '';
  const vertical = firstSegment === 'jp' || firstSegment === 'eu' ? firstSegment : '';
  const base = vertical ? `/${vertical}` : (brand ? `/${brand}` : '');
  const links = vertical === 'eu' ? navLinks.filter(l => l.name !== 'Enchères passées') : navLinks;

  return (
    <nav className="flex flex-nowrap items-center space-x-6 overflow-x-auto text-[16px]">
      {links.map((link) => {
        const href = link.href === '/' ? (base || '/') : `${base}${link.href}`;
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
        const key = link.name === 'Accueil' ? 'home' : link.name === 'Nos Véhicules' ? 'stock' : link.name === 'Enchères passées' ? 'auctions' : link.name === 'Importation' ? 'import' : link.name === 'Simulateur' ? 'sim' : link.name === 'À Propos' ? 'about' : 'blog';
        return (
          <Link
            key={link.name}
            href={href}
            className={`inline-flex items-center h-10 px-4 rounded-md text-base font-semibold text-white hover:text-red-600 transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-red-600 underline underline-offset-4 decoration-red-600' : ''}`}>
            {t(`nav.${key}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation; 
