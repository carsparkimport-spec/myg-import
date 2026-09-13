import { useState } from "react";
import "./EuHomeFullscreen.css";

export default function EuHomeFullscreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fs-page">
      <section className="fs-hero" id="top">
        <div className="fs-image" aria-hidden="true" />
        <div className="fs-shade" aria-hidden="true" />
        <header className="fs-header">
          <a href="#top" className="fs-logo">
            <img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" />
          </a>
          <nav className={menuOpen ? "fs-nav is-open" : "fs-nav"}>
            <a href="#promise" onClick={() => setMenuOpen(false)}>Notre promesse</a>
            <a href="#method" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <a href="#contact" className="fs-header-cta">Décrire mon projet <span>↗</span></a>
          <button className="fs-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Ouvrir le menu">
            <span /><span />
          </button>
        </header>
        <div className="fs-hero-copy">
          <p className="fs-kicker"><span /> Recherche automobile · Europe</p>
          <h1>Le bon véhicule,<br /><em>au bon moment.</em></h1>
          <p className="fs-lede">Nous recherchons pour vous des véhicules hybrides, thermiques et électriques parmi les stocks disponibles partout en Europe.</p>
          <a className="fs-primary" href="#contact">Lancer ma recherche <span>↗</span></a>
        </div>
        <div className="fs-caption"><span>01</span><i /> Luxembourg · Europe</div>
        <div className="fs-scroll">Défiler <span>↓</span></div>
      </section>
      <section className="fs-band" id="promise">
        <p className="fs-band-label">MYG IMPORT / 01</p>
        <h2>Un véhicule trouvé selon<br /><em>vos critères.</em></h2>
        <p className="fs-band-copy">Marque, motorisation, budget, usage : nous ouvrons les bons stocks européens et vous accompagnons jusqu'à la livraison au Luxembourg.</p>
      </section>
      <section className="fs-method" id="method">
        <div><p className="fs-band-label">Une méthode simple</p><h2>Vous choisissez.<br />Nous trouvons.</h2></div>
        <div className="fs-steps"><p><b>01</b> Vos critères</p><p><b>02</b> Notre recherche</p><p><b>03</b> Votre véhicule</p></div>
      </section>
      <footer className="fs-footer" id="contact">
        <span>MYG IMPORT</span><a href="mailto:contact@myg-import.com">contact@myg-import.com ↗</a><small>© 2026</small>
      </footer>
    </div>
  );
}