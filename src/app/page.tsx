"use client";
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';
import VehicleCard from '@/components/VehicleCard';
import vehiclesData from '@/data/vehicles.json';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  images: string[];
  featured?: boolean;
  featuredOrder?: number;
}

const vehicles: Vehicle[] = vehiclesData as Vehicle[];
const featuredVehicles = vehicles
  .filter(v => v.featured)
  .sort((a, b) => (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999))
  .slice(0, 3);

export default function Home() {
  const { t } = useI18n();
  return (
    <Layout title="MYG Import - Accueil | Powered by Passion">
      {/* Hero Section with Supra background */}
      <div
        className="relative h-screen text-white overflow-hidden flex items-center bg-center bg-cover"
        style={{
          backgroundImage: 'url(/images/backgrounds/supra-main.png), url(/images/backgrounds/supra-bg.png)'
        }}
      >
        <div className="relative z-10 text-left px-4 md:px-16 lg:px-24 w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{t('hero.title')}</h1>
          <p className="text-2xl md:text-3xl mb-10 font-light text-gray-200 drop-shadow-md">{t('hero.subtitle')}</p>
          <Link href="/stock">
            <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer shadow-lg">
              {t('hero.cta')}
            </span>
          </Link>
        </div>
      </div>

      {/* Featured Vehicles Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-black">{t('home.featuredTitle')}</h2>
          {featuredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle: Vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">{t('home.noFeatured')}</p>
          )}
          <div className="text-center mt-10">
            <Link href="/stock">
              <span className="inline-block bg-red-600 text-white font-semibold py-3 px-8 rounded hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer">{t('home.viewAllStock')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black">{t('home.testimonialsTitle')}</h2>
          <p className="text-gray-600">{t('home.testimonialsSoon')}</p>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">{t('home.findUs')}</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md max-w-4xl mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83108.1179706703!2d6.059999686718749!3d49.60067899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479545b9a7bd2cad%3A0x75e77b40ce1bf88f!2sLuxembourg!5e0!3m2!1sen!2slu!4v1712328587589!5m2!1sen!2slu"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MYG Import Location - Accueil"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
