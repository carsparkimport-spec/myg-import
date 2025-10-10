"use client";

import { useI18n } from '@/i18n/I18nProvider';

export function SpecsTitle() {
  const { t } = useI18n();
  return <>{t('vehicleDetail.specs')}</>;
}

export function DescriptionTitle() {
  const { t } = useI18n();
  return <>{t('vehicleDetail.description')}</>;
}

export function InterestedButton() {
  const { t } = useI18n();
  return (
    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors text-lg">
      {t('vehicleDetail.interested')}
    </button>
  );
}

export function SpecsTableRows({ price, year, mileage, transmission }: { price: number; year: number; mileage: number; transmission: string }) {
  const { t, locale } = useI18n();
  const tag = locale === 'fr' ? 'fr-FR' : 'en-GB';
  return (
    <>
      <tr className="border-b"><td className="py-2 font-semibold">{t('vehicleDetail.price')}</td><td className="py-2 text-xl font-bold text-red-600">{price.toLocaleString(tag)} €</td></tr>
      <tr className="border-b"><td className="py-2 font-semibold">{t('vehicleDetail.year')}</td><td className="py-2">{year}</td></tr>
      <tr className="border-b"><td className="py-2 font-semibold">{t('vehicleDetail.mileage')}</td><td className="py-2">{mileage.toLocaleString(tag)} km</td></tr>
      <tr className="border-b"><td className="py-2 font-semibold">{t('vehicleDetail.transmission')}</td><td className="py-2">{transmission}</td></tr>
    </>
  );
}













