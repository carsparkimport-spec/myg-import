import { useState } from "react";
import "./GoldenHourValley.css";

const overlooks = [
  ["01", "Le Grund", "Une adresse au creux de la vallée", "Depuis 18 500 € / m²"],
  ["02", "Pfaffenthal", "La pierre claire, la ville en balcon", "Depuis 16 900 € / m²"],
  ["03", "Clausen", "Des volumes ouverts sur les remparts", "Depuis 19 200 € / m²"],
];

export default function GoldenHourValley() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOverlook, setActiveOverlook] = useState(0);

  return (
    <div className="valley-page">
      <header className="valley-header">
        <a className="valley-logo" href="#valley-top" aria-label="Limestone Luxembourg accueil">
          <span className="valley-mark">LL</span><span>Limestone<br /><i>Luxembourg</i></span>
        </a>
        <nav className={menuOpen ? "valley-nav valley-nav-open" : "valley-nav"}>
          <a href="#valley-story">Le territoire</a>
          <a href="#valley-overlooks">Les adresses</a>
          <a href="#valley-contact">Rencontrer l'équipe</a>
        </nav>
        <button className="valley-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Ouvrir le menu">
          {menuOpen ? "Fermer" : "Menu"}
        </button>
        <a className="valley-header-cta" href="#valley-contact">Parler d'un projet</a>
      </header>

      <main id="valley-top">
        <section className="valley-hero">
          <div className="valley-hero-image" />
          <div className="valley-hero-shade" />
          <div className="valley-hero-copy">
            <p className="valley-kicker">Immobilier singulier · Luxembourg</p>
            <h1>Habiter<br /><em>le relief.</em></h1>
            <p className="valley-intro">Des lieux choisis dans les vallées de la ville, là où la pierre blonde rencontre les lignes lentes de l'Alzette.</p>
            <div className="valley-actions">
              <a className="valley-primary" href="#valley-overlooks">Explorer les adresses <span>↗</span></a>
              <a className="valley-secondary" href="#valley-story">Notre regard</a>
            </div>
          </div>
          <div className="valley-coordinate">49°36′ N · 6°08′ E</div>
          <div className="valley-scroll">Descendre <span>↓</span></div>
          <div className="valley-contour contour-one" />
          <div className="valley-contour contour-two" />
        </section>

        <section className="valley-story" id="valley-story">
          <div className="valley-section-label">01 / Le territoire</div>
          <div>
            <h2>Une ville en creux.<br /><em>Une vie en hauteur.</em></h2>
            <p>À Luxembourg, les meilleures adresses ne se découvrent pas sur un plan. Elles se lisent dans les pentes, les murs de soutènement et la lumière qui glisse sur le calcaire.</p>
            <a className="valley-text-link" href="#valley-contact">Comprendre notre sélection <span>→</span></a>
          </div>
          <div className="valley-stat"><strong>37 m</strong><span>de dénivelé entre<br />la ville haute et l'Alzette</span></div>
        </section>

        <section className="valley-overlooks" id="valley-overlooks">
          <div className="valley-overlooks-heading">
            <div><div className="valley-section-label">02 / Les adresses</div><h2>Des vues<br /><em>qui restent.</em></h2></div>
            <a className="valley-text-link" href="#valley-contact">Voir le carnet complet <span>→</span></a>
          </div>
          <div className="valley-cards">
            {overlooks.map((place, index) => (
              <button
                className={activeOverlook === index ? "valley-card valley-card-active" : "valley-card"}
                key={place[1]}
                onClick={() => setActiveOverlook(index)}
                aria-pressed={activeOverlook === index}
              >
                <span className={`valley-card-art art-${index + 1}`}><span className="valley-art-line" /></span>
                <span className="valley-card-meta"><small>{place[0]}</small><strong>{place[1]}</strong><span>{place[2]}</span><b>{place[3]}</b></span>
              </button>
            ))}
          </div>
        </section>

        <section className="valley-contact" id="valley-contact">
          <div><div className="valley-section-label">03 / La rencontre</div><h2>Votre point<br /><em>de vue est ici.</em></h2></div>
          <div><p>Un quartier en tête, une lumière recherchée, une pierre qui vous ressemble ? Nous ouvrons notre carnet et dessinons la suite avec vous.</p><a className="valley-primary" href="mailto:bonjour@limestone.lu">Ouvrir une conversation <span>↗</span></a></div>
        </section>
      </main>

      <footer className="valley-footer"><span className="valley-footer-logo">LL</span><span>Luxembourg · Vallée de l'Alzette</span><span>bonjour@limestone.lu</span><span>© 2026 Limestone</span></footer>
    </div>
  );
}