import Layout from '@/components/Layout';
import Link from 'next/link';

export default function EuropeLanding() {
  return (
    <Layout title="Import Europe - MYG Import">
      <div className="relative h-[70vh] md:h-[85vh] text-white overflow-hidden flex items-center bg-center bg-cover" style={{ backgroundImage: "url('/images/backgrounds/transporteur camion.png')" }}>
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className="relative z-10 text-left px-6 md:px-16 lg:px-24 w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Import Europe</h1>
          <p className="text-2xl md:text-3xl mb-10 font-light text-gray-200 drop-shadow-md">
            Réseau intra-UE, conformité et immatriculation, TVA et garantie européenne.
          </p>
          <Link href="/eu/stock">
            <span className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out cursor-pointer shadow-lg">
              Voir le stock Europe
            </span>
          </Link>
        </div>
      </div>

      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-xl font-semibold mb-2">TVA</div>
              <p className="text-gray-600">Facturation adaptée, véhicules TTC ou TVA récupérable selon profil.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-xl font-semibold mb-2">Garantie EU</div>
              <p className="text-gray-600">Couverture européenne avec réseaux partenaires et extensions.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-xl font-semibold mb-2">Conformité</div>
              <p className="text-gray-600">Dossier complet: COC, contrôle technique, immatriculation locale.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="text-xl font-semibold mb-2">Délais courts</div>
              <p className="text-gray-600">Transports intra-UE optimisés, délais de livraison réduits.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/eu/importation">
              <span className="inline-block bg-black text-white font-semibold py-3 px-8 rounded hover:bg-gray-800 transition">
                Notre process Europe
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
 


