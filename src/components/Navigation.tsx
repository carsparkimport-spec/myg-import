'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'stock', href: '/stock' },
  { key: 'auctions', href: '/encheres' },
  { key: 'import', href: '/importation' },
  { key: 'sim', href: '/simulateur' },
  { key: 'about', href: '/a-propos' },
  { key: 'blog', href: '/blog' },
];

const Navigation = () => {
  const pathname = usePathname();
  const { t } = useI18n();
  const firstSegment = pathname.split('/').filter(Boolean)[0] ?? '';
  const vertical = firstSegment === 'jp' || firstSegment === 'eu' ? firstSegment : '';
  const base = vertical ? `/${vertical}` : '';
  const links = vertical === 'eu' ? navLinks.filter(l => l.key !== 'auctions') : navLinks;

  return (
    <nav className="flex flex-nowrap items-center space-x-6 overflow-x-auto text-[16px]">
      {links.map((link) => {
        const href = link.href === '/' ? (base || '/') : `${base}${link.href}`;
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
        return (
          <Link
            key={link.key}
            href={href}
            className={`inline-flex items-center h-10 px-4 rounded-md text-base font-semibold text-white hover:text-red-600 transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-red-600 underline underline-offset-4 decoration-red-600' : ''}`}>
            {t(`nav.${link.key}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
