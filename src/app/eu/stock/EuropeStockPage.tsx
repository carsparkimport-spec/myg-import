'use client';

import { useEffect, useMemo, useState } from 'react';
import './europe-stock.css';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission?: string;
  price: number;
  images?: string[];
  status?: string;
  origin?: string;
  hidden?: boolean;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

const formatMileage = (mileage: number) =>
  new Intl.NumberFormat('fr-FR').format(mileage);

export default function EuropeStockPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<'all' | 'available' | 'sold'>('all');

  useEffect(() => {
    let active = true;

    fetch('/api/vehicles')
      .then((response) => {
        if (!response.ok) throw new Error('Impossible de charger le stock');
        return response.json() as Promise<Vehicle[]>;
      })
      .then((data) => {
        if (active) setVehicles(data.filter((vehicle) => !vehicle.hidden));
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const availableCount = vehicles.filter((vehicle) => vehicle.status !== 'Vendu').length;
  const soldCount = vehicles.filter((vehicle) => vehicle.status === 'Vendu').length;
  const visibleVehicles = useMemo(() => {
    if (filter === 'available') return vehicles.filter((vehicle) => vehicle.status !== 'Vendu');
    if (filter === 'sold') return vehicles.filter((vehicle) => vehicle.status === 'Vendu');
    return vehicles;
  }, [filter, vehicles]);

  return (
    <div className="es-page" id="top">
      <header className="es-header">
        <a className="es-brand" href="/eu" aria-label="MYG Import Europe, accueil">
          <img src="/images/backgrounds/Logo MYG.png" alt="MYG Import" />
          <span>IMPORT / EUROPE</span>
        </a>
        <nav className="es-nav" aria-label="Navigation principale">
          <a href="/eu">Accueil</a>
          <a href="#stock">Nos véhicules</a>
          <a href="/eu/importation">Importation</a>
          <a href="/eu/a-propos">À propos</a>
        </nav>
        <a className="es-header-cta" href="/eu/contact">Parler à un conseiller <span>↗</span></a>
      </header>

      <main>
        <section className="es-hero">
          <img
            className="es-hero-photo"
            src="/images/eu-stock/hero.png"
            alt="Véhicule européen premium"
          />
          <div className="es-hero-overlay" />
          <div className="es-hero-copy">
            <div className="es-overline">
              <span className="es-live-dot" />
              Stock Europe · {availableCount} véhicule{availableCount > 1 ? 's' : ''} disponible{availableCount > 1 ? 's' : ''}
            </div>
            <h1>Le bon véhicule.<br /><i>Sans détour.</i></h1>
            <p>
              Des voitures européennes sélectionnées, vérifiées et livrées au Luxembourg
              avec un accompagnement complet.
            </p>
            <div className="es-actions">
              <a className="es-button es-button-dark" href="#stock">Explorer le stock <span>↓</span></a>
              <a className="es-text-link" href="/eu/contact">Je cherche un modèle <span>↗</span></a>
            </div>
          </div>
          <div className="es-scroll">Défiler <span>↓</span></div>
        </section>

        <section className="es-stock" id="stock">
          <div className="es-section-head">
            <div>
              <div className="es-overline es-overline-dark">Le stock, maintenant</div>
              <h2>Prêts à partir.<br /><i>Prêts à vivre.</i></h2>
            </div>
            <p>
              Chaque véhicule est documenté et disponible à l’importation.
              Les annonces sont actualisées depuis notre stock réel.
            </p>
          </div>

          <div className="es-filter-row" role="tablist" aria-label="Filtrer les véhicules">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              Tout le stock <sup>{vehicles.length}</sup>
            </button>
            <button className={filter === 'available' ? 'active' : ''} onClick={() => setFilter('available')}>
              Disponibles <sup>{availableCount}</sup>
            </button>
            <button className={filter === 'sold' ? 'active' : ''} onClick={() => setFilter('sold')}>
              Vendus <sup>{soldCount}</sup>
            </button>
          </div>

          {loading && <div className="es-status">Chargement du stock Europe…</div>}
          {error && <div className="es-status">Le stock ne peut pas être chargé pour le moment.</div>}
          {!loading && !error && visibleVehicles.length === 0 && (
            <div className="es-status">Aucun véhicule dans cette sélection.</div>
          )}

          <div className="es-grid">
            {visibleVehicles.map((vehicle) => (
              <article className="es-card" key={vehicle.id}>
                <a className="es-card-image" href={`/eu/voiture/${vehicle.id}`}>
                  <img
                    src={vehicle.images?.[0] || '/images/eu-stock/hero.png'}
                    alt={`${vehicle.make} ${vehicle.model}`}
                  />
                  <span className={vehicle.status === 'Vendu' ? 'es-availability sold' : 'es-availability'}>
                    {vehicle.status === 'Vendu' ? 'Vendu' : 'Disponible'}
                  </span>
                </a>
                <div className="es-card-body">
                  <div className="es-card-kicker">
                    <span>{vehicle.origin || 'Europe'}</span>
                    <span>{vehicle.transmission || 'Automatique'}</span>
                  </div>
                  <h3>{vehicle.make}<br /><i>{vehicle.model}</i></h3>
                  <p>{vehicle.year} · {formatMileage(vehicle.mileage)} km</p>
                  <div className="es-card-foot">
                    <strong>{formatPrice(vehicle.price)}</strong>
                    <a href={`/eu/voiture/${vehicle.id}`}>Voir le véhicule <span>↗</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="es-method">
          <div className="es-method-number">02</div>
          <div className="es-method-copy">
            <div className="es-overline es-overline-dark">Notre méthode</div>
            <h2>Une frontière.<br /><i>Zéro friction.</i></h2>
            <p>
              Vérification, TVA, COC, transport et immatriculation locale :
              nous prenons en charge chaque étape jusqu’à la remise des clés.
            </p>
            <a href="/eu/importation">Comprendre l’importation <span>↗</span></a>
          </div>
          <div className="es-method-steps">
            <div><b>01</b><strong>On inspecte</strong><p>Historique, mécanique et carrosserie.</p></div>
            <div><b>02</b><strong>On sécurise</strong><p>Dossier complet et prix final transparent.</p></div>
            <div><b>03</b><strong>On vous livre</strong><p>Transport assuré et réception au Luxembourg.</p></div>
          </div>
        </section>

        <section className="es-contact">
          <div>
            <div className="es-overline">Votre prochain départ</div>
            <h2>Parlons de la voiture<br /><i>qui vous ressemble.</i></h2>
          </div>
          <a className="es-button es-button-light" href="/eu/contact">Démarrer une recherche <span>↗</span></a>
        </section>
      </main>

      <footer className="es-footer">
        <div className="es-brand"><strong>MYG</strong><span>IMPORT / EUROPE</span></div>
        <p>Importation automobile, depuis Bertrange.<br />Simplement, sérieusement.</p>
        <span>© 2026 MYG Import</span>
      </footer>
    </div>
  );
}