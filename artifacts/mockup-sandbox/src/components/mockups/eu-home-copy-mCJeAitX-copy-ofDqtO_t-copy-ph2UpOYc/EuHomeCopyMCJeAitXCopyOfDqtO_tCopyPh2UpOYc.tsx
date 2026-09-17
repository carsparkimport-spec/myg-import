import { useEffect, useState } from "react";
import "./EuHomeCopyMCJeAitXCopyOfDqtO_t.css";

const features = [
  ["🇪🇺", "TVA", "Facturation adaptée, véhicules TTC ou TVA récupérable selon profil."],
  ["🛡️", "Garantie EU", "Couverture européenne avec réseaux partenaires et extensions disponibles."],
  ["📋", "Conformité", "Dossier complet : COC, contrôle technique, immatriculation locale."],
  ["🚚", "Délais courts", "Transports intra-UE optimisés, livraison rapide dans toute l'Europe."],
];

const vehicles = [
  { image: "car-1.jpeg", make: "BMW", model: "Série 3 Touring", year: "2022", mileage: "32 500", price: "31 900" },
  { image: "car-2.png", make: "BYD", model: "Seal U DM-i", year: "2025", mileage: "15 000", price: "33 490" },
  { image: "car-3.png", make: "Toyota", model: "Yaris Hybrid", year: "2024", mileage: "21 800", price: "22 490" },
];

const reviews = [
  ["Tom Flick", "Quand un vendeur de voitures est passionné d'automobile et souhaite vous proposer des véhicules d'occasion rigoureusement contrôlés, vous aurez le privilège de négocier avec MYG.", "Mai 2026"],
  ["F B", "Une expérience très professionnelle et dynamique du début à la fin. Ils ont réussi à vendre ma voiture rapidement et m'ont trouvé un véhicule qui correspondait parfaitement à mes critères.", "Avril 2026"],
  ["Frank", "Équipe très professionnelle, disponible et transparente. Les démarches administratives ont été simples et rapides. Je recommande sans hésitation.", "07.05.2026"],
];

function Header() {
  const links = [["Accueil", "#top"], ["Nos Véhicules", "#stock"], ["Importation", "#process"], ["Simulateur", "#contact"], ["À Propos", "#about"], ["Blog", "#reviews"]];
  return (
    <header className="eu-header">
      <a href="#top" className="eu-logo-link"><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /></a>
      <nav className="eu-nav">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <div className="eu-header-actions"><button className="eu-language">FR⌄</button><a className="eu-contact bg-[color:var(--color-red-600)]" href="#contact">Nous contacter</a></div>
    </header>
  );
}

function VehicleCard({ vehicle }: { vehicle: typeof vehicles[number] }) {
  return (
    <article className="eu-vehicle-card">
      <div className="eu-vehicle-image"><img src={`/__mockup/images/eu-home/${vehicle.image}`} alt={`${vehicle.make} ${vehicle.model}`} /></div>
      <div className="eu-vehicle-info">
        <h3>{vehicle.make} {vehicle.model}</h3>
        <strong>{vehicle.price} €</strong>
        <p>{vehicle.year} · {vehicle.mileage} km</p>
        <p>Automatique</p>
        <a href="#contact">Voir le véhicule</a>
      </div>
    </article>
  );
}

function Reviews() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % reviews.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="eu-reviews" id="reviews">
      <div className="eu-section-inner">
        <div className="eu-eyebrow">— Avis clients —</div>
        <h2>Ils nous font confiance</h2>
        <div className="eu-rating"><span>★★★★★</span> <small>5/5 · Noté excellent</small></div>
        <div className="eu-review-grid">
          {reviews.map((review, index) => (
            <article className={`eu-review ${index === current ? "eu-review-active" : ""}`} key={review[0]}>
              <div className="eu-review-top"><div><b>{review[0]}</b><small>{review[2]}</small></div><span className="eu-source">Google</span></div>
              <div className="eu-stars">★★★★★</div><p>“{review[1]}”</p>
            </article>
          ))}
        </div>
        <div className="eu-dots">{reviews.map((_, index) => <button aria-label={`Avis ${index + 1}`} className={index === current ? "active" : ""} onClick={() => setCurrent(index)} key={index} />)}</div>
      </div>
    </section>
  );
}

export default function EuHomeCopyMCJeAitXCopyOfDqtO_tCopyPh2UpOYc() {
  return (
    <div className="eu-page" id="top">
      <Header />
      <main>
        <section className="eu-hero">
          <div className="eu-hero-image" style={{ backgroundImage: 'url("/__mockup/images/eu-home-copy-mCJeAitX-copy-ofDqtO_t-luxembourg-attached.jpeg")' }} />
          <div className="eu-hero-shade" />
          <div className="eu-hero-copy">
             <h1
               className="text-[color:var(--color-gray-50)] border-t-[color:var(--elevate-1)] border-r-[color:var(--elevate-1)] border-b-[color:var(--elevate-1)] border-l-[color:var(--elevate-1)] bg-[color:var(--elevate-1)] font-medium">Votre voiture<br />est en Europe.</h1>
             <p>Nous recherchons pour vous le bon véhicule parmi les stocks disponibles partout en Europe, selon vos critères et votre budget.</p>
             <div className="eu-hero-buttons"><a href="#contact" className="eu-button bg-[color:var(--color-red-600)] opacity-[1]">Lancer ma recherche</a><a href="#process" className="eu-button eu-button-ghost">Découvrir notre méthode</a></div>
             <div className="eu-brand-note" style={{ marginTop: 34, paddingLeft: 15, borderLeft: "2px solid #dc2626", display: "grid", gap: 5, color: "#bdbdbd", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase" }}><span>Recherche multimarque</span><b style={{ color: "#fff", fontSize: 12, letterSpacing: ".04em", fontWeight: 600, textTransform: "none" }}>BMW · BYD · Toyota · Audi · Hyundai · VW</b></div>
          </div>
        </section>
        <section className="eu-benefits" id="process">
          <div className="eu-section-inner">
            <h2 className="text-center">Pourquoi importer depuis l'Europe ?</h2>
            <div className="eu-feature-grid">{features.map(([icon, title, desc]) => <article className="eu-feature" key={title}><span>{icon}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
             <h2 className="eu-stock-heading" id="stock">Quelques opportunités trouvées en Europe</h2>
               <p className="eu-stock-intro text-center" style={{ display: "block", width: "100%", maxWidth: 680, color: "#999", fontSize: 15, margin: "0 auto 25px", textAlign: "center" }}>Les véhicules présentés illustrent les recherches que nous pouvons mener pour vous. La disponibilité évolue chaque jour selon les stocks européens.</p>
            <div className="eu-vehicle-grid">{vehicles.map((vehicle) => <VehicleCard key={vehicle.model} vehicle={vehicle} />)}</div>
            <div className="eu-centered"><a href="#stock" className="eu-button">Voir tout le stock Europe</a></div>
          </div>
        </section>
        <Reviews />
      </main>
      <footer className="eu-footer bg-[color:var(--color-black)]" id="contact">
        <div className="eu-footer-inner text-[color:var(--color-white)]">
          <div><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" /><p>Votre partenaire pour l'importation de véhicules en Europe.</p><small>© 2026 MYG Import</small></div>
          <div><h3>Navigation</h3><a href="#top">Accueil</a><a href="#stock">Nos véhicules</a><a href="#process">Importation</a><a href="#reviews">Avis clients</a></div>
          <div><h3>Contact</h3><p>8 Rue des Mérovingiens<br />8070 Bertrange - Luxembourg</p><p>contact@myg-import.com<br />+352 661 408 330</p></div>
        </div>
      </footer>
    </div>
  );
}