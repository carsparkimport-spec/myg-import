import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { id, make, model, year, mileage, transmission, price, images } = vehicle;
  const { locale, t } = useI18n();
  const imageUrl = images[0] || '/vercel.svg';
  const localeTag = locale === 'fr' ? 'fr-FR' : 'en-GB';

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white flex flex-col h-full transition-shadow hover:shadow-lg">
      <div className="relative w-full h-48 sm:h-56 bg-white">
        <Image src={imageUrl} alt={`${make} ${model}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-4" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{make} {model}</h3>
        <p className="text-lg font-semibold text-red-600 mb-3">{price.toLocaleString(localeTag)} €</p>
        <div className="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
          <p>{t('vehicleCard.year')}: {year}</p>
          <p>{t('vehicleCard.mileage')}: {mileage.toLocaleString(localeTag)} km</p>
          <p>{t('vehicleCard.transmission')}: {transmission}</p>
        </div>
        <Link href={`/voiture/${id}`}>
          <span className="mt-auto inline-block text-center bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer w-full">{t('vehicleCard.more')}</span>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard; 