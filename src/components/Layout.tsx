"use client";

import React, { ReactNode, Suspense, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from './Navigation';
import { useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';

function Logo({ className, variant = 'rect' }: { className?: string; variant?: 'rect' | 'square' }) {
  // Point to an existing public asset to avoid 404
  const initialSrc = '/images/backgrounds/Logo MYG.jpeg';
  const [src, setSrc] = useState(initialSrc);
  const variantClass = variant === 'square' ? 'rounded-lg' : '';
  return (
    <img
      src={src}
      alt="MYG Import Logo"
      className={`${className ?? 'h-8 w-auto'} ${variantClass}`}
      onError={() => setSrc('/vercel.svg')}
    />
  );
}

const Header = () => {
  const { t } = useI18n();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black h-20 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex-shrink-0 flex items-center h-full">
          <Link href="/" className="flex items-center">
            <Logo variant="rect" className="h-12 md:h-14 w-auto" />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <Suspense fallback={null}>
            <Navigation />
          </Suspense>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
          <Link 
            href="/contact" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium h-10 px-5 inline-flex items-center rounded-full transition-colors duration-300 whitespace-nowrap"
          >
            {t('cta.contact')}
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="square" className="h-14 w-auto rounded-lg" />
            </div>
            <p>{t('footer.about')}</p>
            <p className="mt-4">© {new Date().getFullYear()} <span className="tracking-tight">MYG Import</span> by Car Spark Import</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.nav')}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white">{t('nav.home')}</Link></li>
              <li><Link href="/stock" className="hover:text-white">{t('nav.stock')}</Link></li>
              <li><Link href="/importation" className="hover:text-white">{t('nav.import')}</Link></li>
              <li><Link href="/simulateur" className="hover:text-white">{t('nav.sim')}</Link></li>
              <li><Link href="/a-propos" className="hover:text-white">{t('nav.about')}</Link></li>
              <li><Link href="/blog" className="hover:text-white">{t('nav.blog')}</Link></li>
              <li><Link href="/cgv#toc" className="hover:text-white">{t('nav.cgv')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li>
                <span className="block text-white font-medium">MYG Import by Car Spark Import</span>
                <span className="block">8 Rue des Mérovingiens</span>
                <span className="block">8070 Bertrange - Luxembourg</span>
                <span className="block">RCS: B288405</span>
              </li>
              <li>
                <div className="text-sm text-gray-400">
                  <div className="text-white font-semibold mb-1">{t('footer.follow')}</div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <a
                      href="https://instagram.com/mygimportluxembourg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white inline-flex items-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                        <defs>
                          <linearGradient id="igGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#f58529" />
                            <stop offset="50%" stopColor="#dd2a7b" />
                            <stop offset="100%" stopColor="#515bd4" />
                          </linearGradient>
                        </defs>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="url(#igGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="url(#igGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="18" cy="6" r="1" fill="url(#igGradient)" />
                      </svg>
                      <span>Instagram @mygimportluxembourg</span>
                    </a>
                    <span className="text-gray-500">·</span>
                    <a
                      href="https://wa.me/352661408330"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white inline-flex items-center gap-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-[#25D366]"
                        aria-hidden="true"
                      >
                        <path d="M20.52 3.48A11.64 11.64 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.51 5.83L0 24l6.33-1.66A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.2-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.09-1.39l-.36-.21-3.76.98.99-3.66-.23-.38A9.96 9.96 0 0 1 2 12C2 6.49 6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm5.05-7.24c-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.2-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.11 2.83.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.55.58.65.2 1.24.17 1.71.1.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31Z"></path>
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="text-sm text-gray-400">
                  <div>{t('contact.hours.monfri')}</div>
                  <div>{t('contact.hours.sat')}</div>
                  <div>{t('contact.hours.sun')}</div>
                </div>
              </li>
              <li>
                <span className="block text-white font-semibold">{t('contact.appointmentOnly')}</span>
              </li>
              <li className="flex items-center gap-2 flex-wrap">
                <a href="mailto:contact@myg-import.com" className="hover:text-white">contact@myg-import.com</a>
                <span className="text-gray-500">·</span>
                <a href="tel:+352661408330" className="hover:text-white">+352 661 408 330</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface LayoutProps {
  children: ReactNode;
  title?: string;
  mainClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'MYG Import', mainClassName }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="MYG Import - Import de véhicules japonais." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className={`flex-grow relative z-10 pt-20 ${mainClassName ?? 'bg-gray-100 text-gray-900'}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;  