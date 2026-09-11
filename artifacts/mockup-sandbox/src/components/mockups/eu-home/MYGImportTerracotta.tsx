import { useState } from "react";
import "./MYGImportTerracotta.css";

const opportunities = [
  ["Toyota Corolla Touring Sports", "2022 · 31 800 km · Hybride · France", "24 900 €"],
  ["BYD Atto 3 Design", "2023 · 18 400 km · Électrique · Belgique", "27 600 €"],
  ["Dacia Duster Journey", "2024 · 12 100 km · TCe 130 · Allemagne", "22 400 €"],
  ["BMW 320d Touring", "2021 · 58 200 km · M Sport · Pays-Bas", "32 800 €"],
  ["Mercedes-Benz A 200", "2022 · 27 900 km · Progressive · Allemagne", "29 500 €"],
  ["Hyundai Tucson N Line", "2023 · 21 600 km · Hybrid · Belgique", "34 700 €"],
  ["Renault Austral Techno", "2024 · 9 800 km · E-Tech · France", "36 900 €"],
];

export default function MYGImportTerracotta() {
  const [contacted, setContacted] = useState(false);
  return <div className="myg-terracotta">
    <header className="myg-head"><a className="myg-mark" href="#top">MYG <b>/</b> IMPORT</a><nav className="myg-nav"><a href="#recherche">La recherche</a><a href="#opportunites">Opportunités</a><a href="#contact">Échanger</a></nav><a className="myg-head-cta" href="#contact">15 000 — 40 000 €</a></header>
    <main id="top">
      <section className="myg-hero"><div className="myg-copy"><p className="myg-kicker">Recherche automobile sur mesure · Europe</p><h1>Votre voiture,<br /><em>trouvée</em> au bon<br />endroit.</h1><p className="myg-lede">MYG Import vous accompagne dans la recherche d'un véhicule multimarque en Europe, selon vos critères, votre budget et les stocks disponibles.</p><div className="myg-actions"><a className="myg-button" href="#contact">Décrire votre projet</a><a className="myg-button alt" href="#opportunites">Voir des exemples</a></div></div><div className="myg-hero-note"><strong>15 000 — 40 000 €</strong>Budget client indicatif<br />Opportunités européennes</div></section>
      <section className="myg-position" id="recherche"><h2>Pas un stock.<br /><em>Une recherche.</em></h2><p>Nous cherchons pour vous, partout en Europe. Marque, carrosserie, énergie, kilométrage : vous définissez les critères, nous identifions les bons véhicules et vérifions chaque opportunité.</p><div className="myg-stat"><b>7</b><span>marques<br />suivies</span></div><div className="myg-stat"><b>14</b><span>pays<br />explorés</span></div></section>
      <section className="myg-stock" id="opportunites"><div className="myg-stock-head"><h2>Exemples d'opportunités</h2><p>Repères de recherche · toutes dans votre budget</p></div><div className="myg-grid">{opportunities.map(([name, detail, price], i) => <article className="myg-opportunity" key={name}><span className="myg-label">0{i + 1} · {i % 2 ? "Disponible selon stock" : "À rechercher"}</span><div><h3>{name}</h3><p>{detail}</p><p className="myg-price">{price}</p></div></article>)}</div></section>
    </main>
    <footer className="myg-foot" id="contact"><span>MYG Import · Luxembourg / Europe</span><span>{contacted ? "Demande reçue · Nous revenons vers vous." : <button onClick={() => setContacted(true)} style={{border:0,background:"none",font:"inherit",color:"inherit",padding:0,cursor:"pointer"}}>Parler à un conseiller</button>}</span><span>© 2026 MYG Import</span></footer>
  </div>;
}