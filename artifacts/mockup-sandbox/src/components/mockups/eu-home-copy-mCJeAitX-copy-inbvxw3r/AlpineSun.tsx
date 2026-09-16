import { useState } from "react";
import "./AlpineSun.css";

const cars = [
  { image: "car-1.jpeg", name: "BMW M4 Competition", detail: "2022  ·  32 500 km", price: "59 900 €" },
  { image: "car-2.png", name: "Porsche 911 Carrera", detail: "2021  ·  18 200 km", price: "89 500 €" },
  { image: "car-3.png", name: "Mercedes-AMG GT", detail: "2020  ·  41 800 km", price: "74 900 €" },
];

export default function AlpineSun() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCar, setActiveCar] = useState(0);

  return (
    <div className="alpine-page" id="alpine-top">
      <header className="alpine-header">
        <a className="alpine-brand" href="#alpine-top"><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /></a>
        <nav className={menuOpen ? "alpine-nav alpine-nav-open" : "alpine-nav"}>
          <a href="#alpine-selection">La sélection</a>
          <a href="#alpine-method">Notre méthode</a>
          <a href="#alpine-contact">Nous trouver</a>
        </nav>
        <div className="alpine-header-right">
          <span className="alpine-locale">FR <i>⌄</i></span>
          <a className="alpine-outline" href="#alpine-contact">Parler à un expert <b>↗</b></a>
        </div>
        <button className="alpine-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">{menuOpen ? "Fermer" : "Menu"}</button>
      </header>

      <main>
        <section className="alpine-hero">
          <div className="alpine-hero-photo" />
          <div className="alpine-hero-wash" />
          <div className="alpine-hero-content">
            <p className="alpine-overline">MYG IMPORT <span>·</span> LUXEMBOURG</p>
            <h1>Le plaisir<br /><em>d’arriver.</em></h1>
            <p className="alpine-lede">Des automobiles européennes choisies avec instinct, vérifiées avec méthode, livrées avec le sourire.</p>
            <div className="alpine-hero-actions">
              <a className="alpine-fill" href="#alpine-selection">Voir la sélection <span>↗</span></a>
              <a className="alpine-text-link" href="#alpine-method">Notre façon de faire <span>→</span></a>
            </div>
          </div>
          <div className="alpine-hero-mark">47° 38′ N <span>—</span> 6° 08′ E</div>
          <div className="alpine-hero-bottom"><span>01</span><i /><span>Défiler pour découvrir</span></div>
        </section>

        <section className="alpine-method" id="alpine-method">
          <div className="alpine-label">01 / LE VOYAGE</div>
          <div className="alpine-method-copy">
            <h2>Une belle voiture.<br /><em>Sans détour.</em></h2>
            <p>Entre l’idée et la remise des clés, nous restons votre seul interlocuteur. Notre réseau parcourt l’Europe pour trouver le modèle qui vous ressemble — puis s’occupe du reste.</p>
            <a className="alpine-text-link dark" href="#alpine-contact">Découvrir la méthode <span>→</span></a>
          </div>
          <div className="alpine-number"><strong>24</strong><span>heures pour recevoir<br />une première sélection</span></div>
        </section>

        <section className="alpine-selection" id="alpine-selection">
          <div className="alpine-selection-head">
            <div><div className="alpine-label">02 / LE GARAGE</div><h2>Des modèles<br /><em>qui donnent envie.</em></h2></div>
            <a className="alpine-text-link dark" href="#alpine-contact">Voir tout le stock <span>→</span></a>
          </div>
          <div className="alpine-cars">
            {cars.map((car, index) => (
              <button className={activeCar === index ? "alpine-car alpine-car-active" : "alpine-car"} key={car.name} onClick={() => setActiveCar(index)}>
                <span className="alpine-car-image"><img src={`/__mockup/images/eu-home/${car.image}`} alt={car.name} /></span>
                <span className="alpine-car-info"><small>0{index + 1}</small><strong>{car.name}</strong><span>{car.detail}</span><b>{car.price}</b></span>
              </button>
            ))}
          </div>
        </section>

        <section className="alpine-contact" id="alpine-contact">
          <div><div className="alpine-label">03 / À VOTRE SERVICE</div><h2>Votre prochaine<br /><em>route commence ici.</em></h2></div>
          <div className="alpine-contact-copy"><p>Une voiture en tête ? Un budget précis ? Dites-nous où vous voulez aller. Nous vous répondrons avec une sélection qui mérite le détour.</p><a className="alpine-fill" href="mailto:contact@myg-import.com">Parler de mon projet <span>↗</span></a></div>
        </section>
      </main>
      <footer className="alpine-footer"><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /><span>Bertrange · Luxembourg</span><span>contact@myg-import.com</span><span>© 2026 MYG Import</span></footer>
    </div>
  );
}