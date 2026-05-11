import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import VehicleDetailPage from '@/components/VehicleDetailPage';
import { notFound } from 'next/navigation';
import vehiclesData from '@/data/vehicles.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel?: string;
  price: number;
  priceNote?: string;
  description: string;
  images: string[];
  status?: string;
  details?: Record<string, string | number | boolean | null | undefined>;
  [key: string]: unknown;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const vehicles: Vehicle[] = vehiclesData as unknown as Vehicle[];
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return { title: 'Véhicule introuvable' };
  }

  const title = `${vehicle.make} ${vehicle.model} (${vehicle.year}) – ${vehicle.price.toLocaleString('fr-LU')} €`;
  const description = vehicle.description;
  const image = vehicle.images?.[0];

  return {
    title,
    description,
    keywords: [
      vehicle.make,
      vehicle.model,
      `${vehicle.make} ${vehicle.model} occasion`,
      `${vehicle.make} ${vehicle.model} luxembourg`,
      'import voiture luxembourg',
      'MYG Import',
    ],
    openGraph: {
      title: `${title} | MYG Import`,
      description,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: `${vehicle.make} ${vehicle.model}` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | MYG Import`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicles: Vehicle[] = vehiclesData as unknown as Vehicle[];
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) notFound();

  return (
    <Layout title={`${vehicle.make} ${vehicle.model} (${vehicle.year}) | MYG Import`}>
      <VehicleDetailPage vehicle={vehicle} />
    </Layout>
  );
}
