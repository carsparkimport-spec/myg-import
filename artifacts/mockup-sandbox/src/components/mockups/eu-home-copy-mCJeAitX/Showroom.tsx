import { useState } from "react";
import "./Showroom.css";

const cars = [
  { image: "car-2.png", name: "Porsche 911 Carrera", type: "Coupé · 2021", price: "89 500 €", tag: "Coup de cœur", year: "2021" },
  { image: "car-1.jpeg", name: "BMW M4 Competition", type: "Berline · 2022", price: "59 900 €", tag: "Disponible", year: "2022" },
  { image: "car-3.png", name: "Mercedes-AMG GT", type: "Coupé · 2020", price: "74 900 €", tag: "Nouveau", year: "2020" },
];

export default function Showroom() {
  const [activeFilter, setActiveFilter] = useState("Tout le stock");
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [selectedCar, setSelectedCar] = useState<typeof cars[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const toggleLike = (name: string) => setLiked((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);

  return (
    <div className="showroom" id="top">
      <header className="showroom-head">
        <a href="#top" className="showroom-brand"><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /><span className="brand-rule" /><span className="brand-label">Automotive studio</span></a>
        <nav className={`showroom-nav ${menuOpen ? "open" : ""}`}><a href="#stock" onClick={() => setMenuOpen(false)}>Collection</a><a href="#savoir-faire" onClick={() => setMenuOpen(false)}>Notre savoir-faire</a><a href="#contact" onClick={() => setContactOpen(true)}>Nous trouver</a></nav>
        <div className="showroom-actions"><button className="showroom-lang">FR / EN</button><button className="showroom-cta" onClick={() => setContactOpen(true)}>Parler à un expert</button><button className="showroom-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">☰</button></div>
      </header>

      <main>
        <section className="showroom-hero">
          <div className="showroom-hero-photo" />
          <div className="showroom-hero-copy"><div className="hero-kicker">MYG Import · Luxembourg</div><h1>Le goût du<br /><em>rare.</em></h1><p className="hero-deck">Des automobiles d'exception, sélectionnées en Europe et préparées avec le même niveau d'exigence que leurs futurs propriétaires.</p><div className="hero-actions"><a className="hero-button" href="#stock">Découvrir la collection</a><a className="hero-button alt" href="#savoir-faire">Notre approche</a></div></div>
          <div className="hero-index">01 <span>/ 03</span></div>
        </section>

        <section className="showroom-intro"><div><div className="eyebrow">Une autre façon d'acheter</div><h2>Pas seulement<br />une voiture.</h2></div><div className="intro-copy">Chez MYG, chaque modèle raconte une histoire. Nous la cherchons dans les meilleurs réseaux européens, nous vérifions chaque détail, puis nous vous la livrons prête à commencer le vôtre.<strong>Véhicules choisis. Conseils honnêtes. Plaisir intact.</strong></div></section>

        <section className="showroom-stock" id="stock"><div className="stock-head"><div><div className="eyebrow">La collection MYG</div><h2>En ce moment.</h2></div><p>Trois silhouettes. Trois caractères. Une même exigence.</p></div><div className="filter-row">{["Tout le stock", "Sportives", "Grand tourisme"].map((filter) => <button key={filter} className={`filter ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="cars-grid">{cars.map((car) => <article className="car-card" key={car.name}><div className="car-visual"><img src={`/__mockup/images/eu-home/${car.image}`} alt={car.name} /><span className="car-tag">{car.tag}</span><button className="car-heart" onClick={() => toggleLike(car.name)} aria-label={`Ajouter ${car.name} aux favoris`}>{liked.includes(car.name) ? "♥" : "♡"}</button></div><div className="car-body"><div className="car-meta"><span>{car.type}</span><span>{car.year}</span></div><h3>{car.name}</h3><div className="car-price">{car.price}</div><button className="car-more" onClick={() => setSelectedCar(car)}>Voir la fiche →</button></div></article>)}</div></section>

        <section className="showroom-process" id="savoir-faire"><div><div className="eyebrow">Le parcours MYG</div><h2>Simple,<br />jusqu'au<br /><em>dernier kilomètre.</em></h2></div><div className="process-list"><div className="process-item"><b>01</b><div><h3>Nous écoutons</h3><p>Votre usage, vos envies, ce petit détail qui fera toute la différence.</p></div></div><div className="process-item"><b>02</b><div><h3>Nous trouvons</h3><p>Notre réseau européen ouvre les bonnes portes, sans compromis sur l'origine ni l'historique.</p></div></div><div className="process-item"><b>03</b><div><h3>Nous préparons</h3><p>Contrôle complet, conformité et livraison au Luxembourg : vous n'avez plus qu'à prendre le volant.</p></div></div></div></section>
        <section className="showroom-quote"><blockquote>« Une automobile doit donner envie de faire un détour. »</blockquote><cite>La philosophie MYG Import</cite></section>
      </main>
      <footer className="showroom-footer" id="contact"><div><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /><p>Le showroom automobile des belles histoires européennes.</p></div><div className="footer-links"><a href="#stock">Collection</a><a href="#savoir-faire">Notre méthode</a><button className="showroom-cta" onClick={() => setContactOpen(true)}>Prendre rendez-vous</button></div></footer>

      {selectedCar && <div className="showroom-modal" onClick={() => setSelectedCar(null)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedCar(null)} aria-label="Fermer">×</button><div className="eyebrow">Fiche véhicule</div><h2>{selectedCar.name}</h2><p>{selectedCar.type} · {selectedCar.price}</p><p>Ce modèle est disponible sur rendez-vous dans notre showroom de Bertrange.</p><button className="modal-submit" onClick={() => { setSelectedCar(null); setContactOpen(true); }}>Organiser une visite</button></div></div>}
      {contactOpen && <div className="showroom-modal" onClick={() => setContactOpen(false)}><form className="modal-card" onSubmit={(event) => { event.preventDefault(); setContactOpen(false); }} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setContactOpen(false)} aria-label="Fermer">×</button><div className="eyebrow">Votre projet automobile</div><h2>Parlons-en.</h2><p>Un premier échange, sans pression. Nous vous répondons sous 24h.</p><input required aria-label="Votre nom" placeholder="Votre nom" /><input required type="email" aria-label="Votre email" placeholder="Votre adresse email" /><button className="modal-submit">Envoyer ma demande</button></form></div>}
    </div>
  );
}