import { useState } from "react";
import "./LuxembourgSummerCanopy.css";

const cars = [
  { image: "car-1.jpeg", make: "BMW", model: "Série 3 Touring", meta: "2022 · 32 500 km", price: "31 900 €" },
  { image: "car-2.png", make: "BYD", model: "Seal U DM-i", meta: "2025 · 15 000 km", price: "33 490 €" },
];

export default function LuxembourgSummerCanopy() {
  const [modal, setModal] = useState(false);
  const [language, setLanguage] = useState("FR");
  return (
    <div className="canopy-page">
      <header className="canopy-header">
        <a href="#top" className="canopy-mark"><em>m</em> myg import</a>
        <nav className="canopy-nav"><a href="#story">Notre méthode</a><a href="#stock">Le stock</a><a href="#contact">Nous trouver</a></nav>
        <div className="canopy-actions"><button className="canopy-lang" onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}>{language}⌄</button><button className="canopy-contact" onClick={() => setModal(true)}>Parler à un expert</button></div>
      </header>
      <main id="top">
        <section className="canopy-hero">
          <div className="canopy-hero-image" /><div className="canopy-hero-shade" />
          <div className="canopy-hero-copy">
            <div className="canopy-kicker">Depuis Bertrange · Luxembourg</div>
            <h1>La route<br />commence <i>ici.</i></h1>
            <p>Nous trouvons votre prochaine voiture au-delà des frontières — avec l'œil juste, les démarches claires et le soleil du Luxembourg en tête.</p>
            <div className="canopy-hero-buttons"><button className="canopy-cta" onClick={() => setModal(true)}>Lancer ma recherche</button><a href="#story" className="canopy-text-link">Voir comment ça marche</a></div>
          </div>
        </section>
        <section className="canopy-ribbon"><div><strong>01</strong><span>Votre besoin, précisément<br />écouté</span></div><div><strong>02</strong><span>Un choix européen<br />sans compromis</span></div><div><strong>03</strong><span>Une livraison suivie<br />jusqu'à chez vous</span></div></section>
        <section className="canopy-main" id="story">
          <div className="canopy-intro"><div><div className="canopy-eyebrow">L'import, autrement</div><h2>Un peu plus<br />de liberté.</h2></div><p>Depuis le Luxembourg, nous ouvrons l'accès aux meilleurs véhicules d'Europe. Pas de catalogue sans âme : une sélection construite autour de vous, de votre budget et de votre vie.</p></div>
          <div className="canopy-feature-grid">{[["01","La bonne voiture","Nous cherchons dans les stocks européens pour trouver le modèle qui vous ressemble."],["02","Le prix juste","Des conditions transparentes, sans frais cachés au dernier kilomètre."],["03","Tout est simple","COC, TVA, immatriculation : nous tenons le fil de chaque formalité."],["04","Ici, avec vous","Un interlocuteur local, de la première question aux premières clés."]].map(([n,t,d]) => <article className="canopy-feature" key={n}><span className="canopy-feature-num">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
          <div className="canopy-stock" id="stock"><div><div className="canopy-eyebrow">En ce moment</div><h2>Quelques belles pistes.</h2><p className="canopy-stock-intro">Des opportunités repérées cette semaine. Leur disponibilité change vite — comme les bonnes choses.</p><button className="canopy-contact" onClick={() => setModal(true)}>Recevoir une sélection</button></div><div className="canopy-grid">{cars.map(car => <article className="canopy-car" key={car.model}><div className="canopy-car-img"><img src={`/__mockup/images/eu-home/${car.image}`} alt={`${car.make} ${car.model}`} /></div><div className="canopy-car-body"><div className="canopy-car-top"><div><h3>{car.make} {car.model}</h3><p>{car.meta} · Automatique</p></div><strong>{car.price}</strong></div><a href="#contact" onClick={() => setModal(true)}>Voir le véhicule →</a></div></article>)}</div></div>
        </section>
      </main>
      <footer className="canopy-footer" id="contact"><div><h3>myg import</h3><p>Votre partenaire automobile<br />au cœur de l'Europe.</p><small>© 2026 MYG Import</small></div><div><h3>Passer nous voir</h3><p>8 Rue des Mérovingiens<br />8070 Bertrange, Luxembourg<br /><br />contact@myg-import.com<br />+352 661 408 330</p></div></footer>
      {modal && <div className="canopy-modal-backdrop" onClick={() => setModal(false)}><div className="canopy-modal" onClick={e => e.stopPropagation()}><button className="canopy-close" onClick={() => setModal(false)}>×</button><div className="canopy-eyebrow">Votre projet</div><h2>Parlons voiture.</h2><p>Laissez-nous vos coordonnées. Un expert MYG vous répondra dans la journée.</p><input aria-label="Votre nom" placeholder="Votre nom" /><input aria-label="Votre email" placeholder="Votre email" /><button className="canopy-contact" onClick={() => setModal(false)}>Envoyer ma demande</button></div></div>}
    </div>
  );
}