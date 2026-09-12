import { useState } from "react";
import "./GoldenHour.css";

const vehicles = [
  ["car-1.jpeg", "BMW M4 Competition", "59 900 €", "2022 · 32 500 km"],
  ["car-2.png", "Porsche 911 Carrera", "89 500 €", "2021 · 18 200 km"],
  ["car-3.png", "Mercedes-Benz AMG GT", "74 900 €", "2020 · 41 800 km"],
];

export default function GoldenHour() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(0);

  return (
    <div className="golden-page">
      <header className="golden-header">
        <a className="golden-logo" href="#golden-top">
          <img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" />
        </a>
        <nav className={menuOpen ? "golden-nav golden-nav-open" : "golden-nav"}>
          <a href="#golden-stock">Le stock</a>
          <a href="#golden-method">Notre méthode</a>
          <a href="#golden-contact">Parler à un expert</a>
        </nav>
        <button className="golden-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Ouvrir le menu">
          {menuOpen ? "Fermer" : "Menu"}
        </button>
        <a className="golden-header-cta" href="#golden-contact">Prendre rendez-vous</a>
      </header>

      <main id="golden-top">
        <section className="golden-hero">
          <div className="golden-hero-image" />
          <div className="golden-hero-shade" />
          <div className="golden-hero-copy">
            <p className="golden-kicker">MYG Import · Luxembourg</p>
            <h1>La route<br /><em>commence ici.</em></h1>
            <p className="golden-intro">Des véhicules européens sélectionnés avec exigence, préparés avec soin et livrés prêts à prendre la route.</p>
            <div className="golden-actions">
              <a className="golden-primary" href="#golden-stock">Découvrir le stock <span>↗</span></a>
              <a className="golden-secondary" href="#golden-method">Comment ça marche</a>
            </div>
          </div>
          <div className="golden-location">49°36′ N · 6°08′ E</div>
          <div className="golden-scroll">Défiler <span>↓</span></div>
        </section>

        <section className="golden-intro-section" id="golden-method">
          <div className="golden-section-label">01 / Notre approche</div>
          <div>
            <h2>Une voiture juste.<br /><em>Un achat simple.</em></h2>
            <p>Nous cherchons, contrôlons et importons votre prochaine voiture en Europe. Un seul interlocuteur, un prix lisible, un accompagnement de la première question à la remise des clés.</p>
            <a className="golden-text-link" href="#golden-contact">Découvrir notre méthode <span>→</span></a>
          </div>
          <div className="golden-stat"><strong>24 h</strong><span>pour recevoir<br />une première sélection</span></div>
        </section>

        <section className="golden-stock" id="golden-stock">
          <div className="golden-stock-heading">
            <div><div className="golden-section-label">02 / La sélection</div><h2>Des modèles<br /><em>qui ont du sens.</em></h2></div>
            <a className="golden-text-link" href="#golden-contact">Voir tout le stock <span>→</span></a>
          </div>
          <div className="golden-vehicles">
            {vehicles.map((vehicle, index) => (
              <button
                className={activeVehicle === index ? "golden-vehicle golden-vehicle-active" : "golden-vehicle"}
                key={vehicle[1]}
                onClick={() => setActiveVehicle(index)}
              >
                <span className="golden-vehicle-image"><img src={`/__mockup/images/eu-home/${vehicle[0]}`} alt={vehicle[1]} /></span>
                <span className="golden-vehicle-meta"><small>0{index + 1}</small><strong>{vehicle[1]}</strong><span>{vehicle[3]}</span><b>{vehicle[2]}</b></span>
              </button>
            ))}
          </div>
        </section>

        <section className="golden-contact" id="golden-contact">
          <div><div className="golden-section-label">03 / Parlons voiture</div><h2>Votre prochaine<br /><em>est peut-être ici.</em></h2></div>
          <div><p>Un modèle en tête ? Un budget à respecter ? Parlez-nous de votre projet et recevez une première sélection personnalisée.</p><a className="golden-primary" href="mailto:contact@myg-import.com">Écrire à MYG Import <span>↗</span></a></div>
        </section>
      </main>

      <footer className="golden-footer"><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /><span>Bertrange · Luxembourg</span><span>contact@myg-import.com</span><span>© 2026 MYG Import</span></footer>
    </div>
  );
}