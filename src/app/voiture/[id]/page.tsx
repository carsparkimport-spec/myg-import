import Layout from '@/components/Layout';
import { SpecsTitle, DescriptionTitle, InterestedButton, SpecsTableRows } from '@/components/VehicleDetailI18n';
import vehiclesData from '@/data/vehicles.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
}

const vehicles: Vehicle[] = vehiclesData as Vehicle[];

function getVehicleById(id: string): Vehicle | undefined {
  return vehicles.find(v => v.id === id);
}

export default function VehiclePage({ params }: { params: { id: string } }) {
  const vehicle = getVehicleById(params.id);
  if (!vehicle) notFound();

  return (
    <Layout title={`${vehicle.make} ${vehicle.model} (${vehicle.year}) | MYG Import`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{vehicle.make} {vehicle.model} <span className="text-2xl text-gray-600">({vehicle.year})</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full h-80 md:h-[500px] mb-4 bg-gray-200 rounded overflow-hidden">
              <Image src={vehicle.images[0] || '/vercel.svg'} alt={`${vehicle.make} ${vehicle.model}`} fill className="object-contain p-6" />
            </div>
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
      </div>
    </Layout>
  );
} 