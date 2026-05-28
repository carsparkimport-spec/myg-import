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
  status?: string;
  origin?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  basePath?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, basePath = '/voiture' }) => {
  const { id, make, model, year, mileage, transmission, price, images, status, origin } = vehicle;
  const { locale, t } = useI18n();
  const imageUrl = (images && images[0]) || '/vercel.svg';
  const localeTag = locale === 'fr' ? 'fr-FR' : 'en-GB';
  const isSold = status === 'Vendu';
  const isJapan = origin === 'Japon';

  return (
    <div className={`group bg-[#151515]/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-white/25 hover:bg-[#1a1a1a]/90 ${isSold ? 'opacity-60' : ''}`}>
      {/* Image */}
      <div className="relative w-full h-52 bg-black/30 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${make} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges top-left : origine */}
        {isJapan && (
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
            🇯🇵 Japon
          </div>
        )}
        {/* Badge top-right : vendu */}
        {isSold && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            Vendu
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow gap-1">
        <h3 className="text-lg font-bold text-white leading-tight">{make} {model}</h3>
        <p className="text-xl font-extrabold text-white font-mono">{(price ?? 0).toLocaleString(localeTag)} €</p>
        <div className="text-sm text-gray-400 space-y-0.5 mt-1 flex-grow">
          <p>{year} · {(mileage ?? 0).toLocaleString(localeTag)} km</p>
          <p>{transmission ?? ''}</p>
        </div>
        <Link href={`${basePath}/${id}`}>
          <span className="mt-4 inline-block text-center bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer w-full text-sm">
            {t('vehicleCard.more')}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
