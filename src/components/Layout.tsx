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
            className="bg-red-600 hover:bg-red-700 text-white font-medium h-10 px-5 inline-flex items-center rounded-full transition-colors duration-300"
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
            <p className="mt-4">© {new Date().getFullYear()} <span className="tracking-tight">MYG Import</span></p>
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
              <li><Link href="/cgv" className="hover:text-white">{t('nav.cgv')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li>
                <span className="block text-white font-medium">MYG Import by Car Spark Import</span>
                <span className="block">8 Rue des Mérovingiens</span>
                <span className="block">8070 Bertrange - Luxembourg</span>
                <span className="block">RCS: B288405</span>
              </li>
              <li><a href="mailto:contact@mygimport.lu" className="hover:text-white">contact@mygimport.lu</a></li>
              <li><a href="tel:+352661408330" className="hover:text-white">+352 661 408 330</a></li>
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