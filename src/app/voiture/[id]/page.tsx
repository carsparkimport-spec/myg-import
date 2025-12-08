import Layout from '@/components/Layout';
import { SpecsTitle, DescriptionTitle, InterestedButton, SpecsTableRows } from '@/components/VehicleDetailI18n';
import VehicleGallery from '@/components/VehicleGallery';
import VehicleDetailsCard from '@/components/VehicleDetailsCard';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  description: string;
  images: string[];
  details?: Record<string, string | number | boolean | null>;
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:5000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  let vehicle: Vehicle | undefined;
  try {
    const response = await fetch(`${protocol}://${host}/api/vehicles`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch vehicles: ${response.status}`);
    }
    
    const vehicles: Vehicle[] = await response.json();
    vehicle = vehicles.find(v => v.id === id);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    throw error;
  }
  
  if (!vehicle) notFound();

  return (
    <Layout title={`${vehicle.make} ${vehicle.model} (${vehicle.year}) | MYG Import`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{vehicle.make} {vehicle.model} <span className="text-2xl text-gray-600">({vehicle.year})</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VehicleGallery images={vehicle.images} altBase={`${vehicle.make} ${vehicle.model}`} />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2"><SpecsTitle /></h2>
              <table className="w-full text-left mb-6">
                <tbody>
                  <SpecsTableRows price={vehicle.price} year={vehicle.year} mileage={vehicle.mileage} transmission={vehicle.transmission} />
                </tbody>
              </table>
              <InterestedButton />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4"><DescriptionTitle /></h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{vehicle.description}</p>
        </div>

        <VehicleDetailsCard details={vehicle.details} />
      </div>
    </Layout>
  );
} 