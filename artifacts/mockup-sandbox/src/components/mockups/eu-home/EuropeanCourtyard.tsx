import { useState } from "react";
import "./EuropeanCourtyard.css";

const inventory = [
  { name: "Volvo V90 Cross Country", detail: "2023 · 28 410 km · AWD", price: "46 800 €" },
  { name: "Alfa Romeo Giulia", detail: "2022 · 19 200 km · Veloce", price: "39 500 €" },
];

export default function EuropeanCourtyard() {
  const [contacted, setContacted] = useState(false);
  return (
    <div className="courtyard-page">
      <header className="courtyard-header">
        <a className="courtyard-mark" href="#top">MYG <span>/</span> IMPORT</a>
        <nav className="courtyard-nav" aria-label="Navigation">
          <a href="#collection">Collection</a><a href="#method">Notre méthode</a><a href="#contact">Parler à un conseiller</a>
        </nav>
        <a className="courtyard-header-cta" href="#contact">Luxembourg · EU</a>
      </header>
      <main id="top">
        <section className="courtyard-hero">
          <div className="courtyard-hero-photo" aria-label="Véhicule devant notre showroom européen" role="img" />
          <div className="courtyard-hero-copy">
            <p className="courtyard-kicker">Sélection européenne · Bertrange</p>
            <h1>Le juste<br /><em>modèle.</em></h1>
            <p className="courtyard-lede">Des véhicules choisis pour leur histoire, leur configuration et leur état. Livrés depuis les meilleures adresses européennes.</p>
            <div className="courtyard-actions">
              <a className="courtyard-button" href="#collection">Voir la collection</a>
              <a className="courtyard-button secondary" href="#method">Notre méthode</a>
            </div>
          </div>
          <div className="courtyard-meta"><strong>01 / 04</strong>Le showroom · Luxembourg</div>
        </section>
        <section className="courtyard-strip" id="method">
          <h2>Importé avec<br /><em>discernement.</em></h2>
          <p>Nous parcourons l'Europe pour trouver des automobiles qui méritent un nouveau chapitre. Chaque dossier est vérifié, chaque détail est documenté.</p>
          <div className="courtyard-stat"><b>14</b><span>pays couverts</span></div>
          <div className="courtyard-stat"><b>42</b><span>points contrôlés</span></div>
        </section>
        <section className="courtyard-stock" id="collection">
          <div className="courtyard-stock-head"><h2>La collection</h2><p>Disponible au showroom · mise à jour chaque semaine</p></div>
          <div className="courtyard-cards">
            {inventory.map((car, index) => <article className="courtyard-card" key={car.name}>
              <div><span className="courtyard-card-label">0{index + 1} · {index === 0 ? "Break grand tourisme" : "Sport berline"}</span></div>
              <div><h3>{car.name}</h3><p>{car.detail}</p><p className="courtyard-card-price">{car.price}</p></div>
            </article>)}
          </div>
        </section>
      </main>
      <footer className="courtyard-foot" id="contact">
        <span>8 Rue des Mérovingiens · Bertrange</span>
        <span>{contacted ? "Message reçu · Nous revenons vers vous." : <button onClick={() => setContacted(true)} style={{border:0,background:"none",font:"inherit",color:"inherit",padding:0,cursor:"pointer"}}>contact@myg-import.com · +352 661 408 330</button>}</span>
        <span>© 2026 MYG Import</span>
      </footer>
    </div>
  );
}