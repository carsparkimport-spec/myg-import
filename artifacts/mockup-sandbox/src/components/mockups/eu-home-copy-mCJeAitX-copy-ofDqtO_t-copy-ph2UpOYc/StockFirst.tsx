import { useMemo, useState } from "react";
import "./stockfirst.css";

type Vehicle = {
  image: string;
  make: string;
  model: string;
  meta: string;
  price: string;
  type: string;
  location: string;
};

const vehicles: Vehicle[] = [
  { image: "stock-first-porsche.png", make: "Porsche", model: "911 Carrera", meta: "2021 · 18 200 km · PDK", price: "89 500 €", type: "Coupé", location: "Stuttgart, DE" },
  { image: "stock-first-mercedes.png", make: "Mercedes-AMG", model: "GT 53 4MATIC+", meta: "2020 · 41 800 km · Automatique", price: "74 900 €", type: "Coupé", location: "Bruxelles, BE" },
  { image: "stock-first-audi.png", make: "Audi", model: "RS 6 Avant", meta: "2023 · 12 600 km · Tiptronic", price: "97 200 €", type: "Break", location: "Munich, DE" },
];

function Header({ onContact }: { onContact: () => void }) {
  return (
    <header className="sf-header">
      <a className="sf-brand" href="#top" aria-label="MYG Import, retour en haut">
        <span className="sf-mark">MYG</span><span className="sf-brand-sub">IMPORT / EUROPE</span>
      </a>
      <nav className="sf-nav" aria-label="Navigation principale">
        <a href="#stock">Le stock</a><a href="#promise">Notre méthode</a><a href="#about">À propos</a>
      </nav>
      <button className="sf-header-cta" onClick={onContact}>Parler à un conseiller <span>↗</span></button>
    </header>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="sf-card">
      <div className="sf-card-image"><img src={`/__mockup/images/${vehicle.image}`} alt={`${vehicle.make} ${vehicle.model}`} /><span className="sf-availability">Disponible</span><button className="sf-save" aria-label={`Ajouter ${vehicle.make} ${vehicle.model} aux favoris`}>♡</button></div>
      <div className="sf-card-body"><div className="sf-card-kicker">{vehicle.type} <span>{vehicle.location}</span></div><h3>{vehicle.make}<br /><em>{vehicle.model}</em></h3><p>{vehicle.meta}</p><div className="sf-card-foot"><strong>{vehicle.price}</strong><a href="#contact">Voir le véhicule <span>↗</span></a></div></div>
    </article>
  );
}

export default function StockFirst() {
  const [filter, setFilter] = useState("Tout le stock");
  const [contactOpen, setContactOpen] = useState(false);
  const visibleVehicles = useMemo(() => filter === "Tout le stock" ? vehicles : vehicles.filter((vehicle) => vehicle.type === filter), [filter]);

  return (
    <div className="sf-page" id="top">
      <Header onContact={() => setContactOpen(true)} />
      <main>
        <section className="sf-hero">
          <img className="sf-hero-photo" src="/__mockup/images/stock-first-hero.png" alt="BMW M4 Competition graphite, vue trois-quarts" />
          <div className="sf-hero-overlay" />
          <div className="sf-hero-copy">
            <div className="sf-overline"><span className="sf-live-dot" /> Stock sélectionné · 14 véhicules disponibles</div>
            <h1>Le bon véhicule.<br /><i>Sans détour.</i></h1>
            <p>Des voitures européennes d’exception, inspectées et livrées au Luxembourg en toute transparence.</p>
            <div className="sf-actions"><a className="sf-button sf-button-dark" href="#stock">Explorer le stock <span>↓</span></a><button className="sf-text-button" onClick={() => setContactOpen(true)}>Je cherche un modèle <span>↗</span></button></div>
          </div>
          <div className="sf-hero-vehicle-label"><span>À la une / 01</span><strong>BMW M4 Competition</strong><small>2022 · 32 500 km · 59 900 €</small></div>
          <div className="sf-scroll">Défiler <span>↓</span></div>
        </section>

        <section className="sf-stock" id="stock">
          <div className="sf-section-head"><div><div className="sf-overline dark">Le stock, maintenant</div><h2>Prêts à partir.<br /><i>Prêts à vivre.</i></h2></div><p>Chaque véhicule est contrôlé, documenté et disponible à l’importation. Pas de surprises à l’arrivée.</p></div>
          <div className="sf-filter-row" role="tablist" aria-label="Filtrer les véhicules">{["Tout le stock", "Coupé", "Break"].map((item) => <button key={item} className={filter === item ? "sf-filter active" : "sf-filter"} onClick={() => setFilter(item)}>{item}<sup>{item === "Tout le stock" ? "03" : item === "Coupé" ? "02" : "01"}</sup></button>)}</div>
          <div className="sf-grid">{visibleVehicles.map((vehicle) => <VehicleCard key={vehicle.model} vehicle={vehicle} />)}</div>
          {visibleVehicles.length === 0 && <div className="sf-empty">Aucun véhicule dans cette sélection. <button onClick={() => setFilter("Tout le stock")}>Voir tout le stock</button></div>}
          <div className="sf-stock-bottom"><span>Mis à jour aujourd’hui à 09:42</span><a className="sf-button sf-button-outline" href="#contact">Recevoir le stock complet <span>↗</span></a></div>
        </section>

        <section className="sf-promise" id="promise">
          <div className="sf-promise-number">02</div><div className="sf-promise-copy"><div className="sf-overline dark">Notre méthode</div><h2>Une frontière.<br /><i>Zéro friction.</i></h2><p>Nous prenons en charge ce qui se passe entre le coup de cœur et vos clés : vérification, TVA, COC, transport et immatriculation locale.</p><a className="sf-line-link" href="#contact">Comprendre l’importation <span>↗</span></a></div>
          <div className="sf-methods"><div><b>01</b><strong>On inspecte</strong><p>Historique, mécanique, carrosserie. Rien ne reste dans l’angle mort.</p></div><div><b>02</b><strong>On sécurise</strong><p>Un dossier complet et un prix final, avant même le départ.</p></div><div><b>03</b><strong>On vous livre</strong><p>Transport assuré, suivi en temps réel, réception au Luxembourg.</p></div></div>
        </section>

        <section className="sf-contact-strip" id="contact"><div><div className="sf-overline">Votre prochain départ</div><h2>Parlons de la voiture<br /><i>qui vous ressemble.</i></h2></div><button className="sf-button sf-button-light" onClick={() => setContactOpen(true)}>Démarrer une recherche <span>↗</span></button></section>
      </main>
      <footer className="sf-footer" id="about"><div className="sf-brand"><span className="sf-mark">MYG</span><span className="sf-brand-sub">IMPORT / EUROPE</span></div><p>Importation automobile, depuis Bertrange.<br />Simplement, sérieusement.</p><span>© 2026 MYG Import</span></footer>
      {contactOpen && <div className="sf-modal-backdrop" role="presentation" onClick={() => setContactOpen(false)}><section className="sf-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={(event) => event.stopPropagation()}><button className="sf-modal-close" onClick={() => setContactOpen(false)} aria-label="Fermer">×</button><div className="sf-overline dark">Votre recherche</div><h2 id="contact-title">Dites-nous ce<br /><i>qui vous tente.</i></h2><p>Un conseiller vous répond sous 24 heures.</p><label>Votre prénom<input autoFocus placeholder="Jean" /></label><label>Votre email<input type="email" placeholder="jean@email.com" /></label><button className="sf-button sf-button-dark sf-submit" onClick={() => setContactOpen(false)}>Envoyer ma recherche <span>↗</span></button></section></div>}
    </div>
  );
}