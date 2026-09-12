import { useState } from "react";
import "./EuropeanCourtyardTerracotta.css";

const inventory = [
  { name: "Volvo V90 Cross Country", detail: "2023 · 28 410 km · AWD", price: "46 800 €", label: "01 · Break grand tourisme" },
  { name: "Alfa Romeo Giulia", detail: "2022 · 19 200 km · Veloce", price: "39 500 €", label: "02 · Sport berline" },
  { name: "Peugeot 508 SW", detail: "2021 · 34 800 km · GT", price: "28 900 €", label: "03 · Arrivée prochaine" },
];

export default function EuropeanCourtyardTerracotta() {
  const [contacted, setContacted] = useState(false);
  return (
    <div className="terracotta-page">
      <header className="terracotta-header">
        <a className="terracotta-mark" href="#top">MYG <span>/</span> IMPORT</a>
        <nav className="terracotta-nav" aria-label="Navigation"><a href="#collection">Collection</a><a href="#method">Notre méthode</a><a href="#contact">Parler à un conseiller</a></nav>
        <a className="terracotta-header-cta" href="#contact">Luxembourg · EU</a>
      </header>
      <main id="top">
        <section className="terracotta-hero">
          <div className="terracotta-photo" aria-label="Le showroom MYG dans la lumière de fin de journée" role="img" />
          <div className="terracotta-copy">
            <p className="terracotta-kicker">Sélection européenne · Bertrange</p>
            <h1>Les belles histoires<br /><em>commencent</em><br />dans la cour.</h1>
            <p className="terracotta-lede">Des automobiles choisies pour leur histoire, leur configuration et leur état. Livrées depuis les meilleures adresses européennes.</p>
            <div className="terracotta-actions"><a className="terracotta-button" href="#collection">Voir la collection</a><a className="terracotta-button alt" href="#method">Notre méthode</a></div>
          </div>
          <div className="terracotta-index"><strong>01 / 04</strong>Le showroom · Luxembourg</div>
        </section>
        <section className="terracotta-band" id="method">
          <h2>Importé avec<br /><em>discernement.</em></h2>
          <p>Dans la lumière chaude de notre cour, chaque véhicule a sa place. Nous parcourons l'Europe pour trouver des automobiles qui méritent un nouveau chapitre.</p>
          <div className="terracotta-stat"><b>14</b><span>pays couverts</span></div>
          <div className="terracotta-stat"><b>42</b><span>points contrôlés</span></div>
        </section>
        <section className="terracotta-stock" id="collection">
          <div className="terracotta-stock-head"><h2>La collection</h2><p>Disponible au showroom · mise à jour chaque semaine</p></div>
          <div className="terracotta-grid">{inventory.map((car, index) => <article className="terracotta-card" key={car.name}><span className="terracotta-label">{car.label}</span><div><h3>{car.name}</h3><p>{car.detail}</p><p className="terracotta-price">{car.price}</p></div></article>)}</div>
        </section>
      </main>
      <footer className="terracotta-foot" id="contact"><span>8 Rue des Mérovingiens · Bertrange</span><span>{contacted ? "Message reçu · Nous revenons vers vous." : <button onClick={() => setContacted(true)} style={{border:0,background:"none",font:"inherit",color:"inherit",padding:0,cursor:"pointer"}}>contact@myg-import.com · +352 661 408 330</button>}</span><span>© 2026 MYG Import</span></footer>
    </div>
  );
}