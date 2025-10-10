'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const applyLocale = (next: 'fr' | 'en') => {
    setLocale(next);
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('lang', next);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const base = 'px-2.5 py-1 rounded-md text-sm font-medium transition-colors duration-200';

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        className={`${base} ${locale === 'fr' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
        onClick={() => applyLocale('fr')}
        aria-pressed={locale === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        className={`${base} ${locale === 'en' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
        onClick={() => applyLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}


