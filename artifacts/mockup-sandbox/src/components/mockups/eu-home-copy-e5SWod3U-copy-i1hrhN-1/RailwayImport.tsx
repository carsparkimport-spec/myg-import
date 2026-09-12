import { useEffect, useState } from "react";

const features = [
  ["01", "TVA", "Facturation adaptée, véhicules TTC ou TVA récupérable selon profil."],
  ["02", "Garantie EU", "Couverture européenne avec réseaux partenaires et extensions disponibles."],
  ["03", "Conformité", "Dossier complet : COC, contrôle technique, immatriculation locale."],
  ["04", "Délais courts", "Transports intra-UE optimisés, livraison rapide dans toute l'Europe."],
];

const vehicles = [
  { image: "car-1.jpeg", make: "BMW", model: "M4 Competition", year: "2022", mileage: "32 500", price: "59 900" },
  { image: "car-2.png", make: "Porsche", model: "911 Carrera", year: "2021", mileage: "18 200", price: "89 500" },
  { image: "car-3.png", make: "Mercedes-Benz", model: "AMG GT", year: "2020", mileage: "41 800", price: "74 900" },
];

const reviews = [
  ["Tom Flick", "Quand un vendeur de voitures est passionné d'automobile et souhaite vous proposer des véhicules d'occasion rigoureusement contrôlés, vous aurez le privilège de négocier avec MYG.", "Mai 2026"],
  ["F B", "Une expérience très professionnelle et dynamique du début à la fin. Ils ont réussi à vendre ma voiture rapidement et m'ont trouvé un véhicule qui correspondait parfaitement à mes critères.", "Avril 2026"],
  ["Frank", "Équipe très professionnelle, disponible et transparente. Les démarches administratives ont été simples et rapides. Je recommande sans hésitation.", "07.05.2026"],
];

function Rail() {
  return (
    <aside style={{ width: 82, background: "#172a2a", color: "#eee8dc", minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "28px 0 24px", position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 5 }}>
      <a href="#top" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "#e9a15c", fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: ".17em", textDecoration: "none" }}>MYG / IMPORT</a>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center", fontSize: 10, letterSpacing: ".16em", color: "#adc0b7" }}>
        <a href="#stock" style={{ color: "inherit", textDecoration: "none", writingMode: "vertical-rl" }}>STOCK</a>
        <span style={{ width: 1, height: 44, background: "#587269" }} />
        <a href="#process" style={{ color: "inherit", textDecoration: "none", writingMode: "vertical-rl" }}>PROCESS</a>
      </div>
      <a href="#contact" style={{ color: "#e9a15c", textDecoration: "none", fontSize: 20 }}>↗</a>
    </aside>
  );
}

function InventoryCard({ vehicle, index }: { vehicle: typeof vehicles[number]; index: number }) {
  return (
    <article style={{ minWidth: 284, background: "#f1eadf", borderTop: "3px solid #d97846", position: "relative" }}>
      <div style={{ height: 185, overflow: "hidden", position: "relative" }}>
        <img src={`/__mockup/images/eu-home/${vehicle.image}`} alt={`${vehicle.make} ${vehicle.model}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(.82)" }} />
        <span style={{ position: "absolute", top: 12, left: 14, color: "#f8f1e6", fontSize: 11, letterSpacing: ".16em" }}>0{index + 1} / EUROPE</span>
      </div>
      <div style={{ padding: "20px 20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ margin: 0, color: "#172a2a", fontFamily: "Georgia, serif", fontSize: 21, fontWeight: 400 }}>{vehicle.make} <i>{vehicle.model}</i></h3>
          <strong style={{ color: "#d2643b", fontSize: 16, whiteSpace: "nowrap" }}>{vehicle.price} €</strong>
        </div>
        <p style={{ color: "#6e756e", fontSize: 12, letterSpacing: ".08em", margin: "13px 0 17px" }}>{vehicle.year} &nbsp;·&nbsp; {vehicle.mileage} KM &nbsp;·&nbsp; AUTO</p>
        <a href="#contact" style={{ color: "#172a2a", fontSize: 11, letterSpacing: ".16em", textDecoration: "none", borderBottom: "1px solid #d97846", paddingBottom: 4 }}>VOIR LE VÉHICULE&nbsp; →</a>
      </div>
    </article>
  );
}

export default function RailwayImport() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % reviews.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div id="top" style={{ background: "#eee6d8", color: "#172a2a", minHeight: "100dvh", marginLeft: 82, fontFamily: "'Trebuchet MS', sans-serif" }}>
      <Rail />
      <header style={{ height: 78, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 clamp(22px, 5vw, 78px)", borderBottom: "1px solid #d7cebf", fontSize: 11, letterSpacing: ".13em" }}>
        <span style={{ color: "#777b72" }}>LUXEMBOURG / 49°37′ N</span>
        <nav style={{ display: "flex", gap: 26 }}><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>À PROPOS</a><a href="#reviews" style={{ color: "inherit", textDecoration: "none" }}>AVIS</a><a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>CONTACT</a></nav>
        <button style={{ border: 0, background: "none", color: "#d2643b", fontSize: 11 }}>FR⌄</button>
      </header>
      <main>
        <section style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.06fr) minmax(300px, .94fr)", minHeight: 570 }}>
          <div style={{ position: "relative", minHeight: 520, backgroundImage: 'url("/__mockup/images/eu-home/current-hero-luxembourg-v2.png")', backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(16,34,33,.48), rgba(16,34,33,.05))" }} />
            <div style={{ position: "absolute", left: "clamp(24px, 7vw, 108px)", bottom: 48, color: "#f6efe3", maxWidth: 560 }}>
              <p style={{ margin: "0 0 22px", color: "#f2ae72", fontSize: 11, letterSpacing: ".2em" }}>MYG IMPORT / 2026</p>
              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(62px, 9vw, 132px)", lineHeight: ".79", fontWeight: 400, letterSpacing: "-.07em", margin: 0 }}>Import<br /><i>Europe</i></h1>
            </div>
          </div>
          <div style={{ padding: "clamp(36px, 6vw, 86px) clamp(28px, 6vw, 90px)", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#e5dccd" }}>
            <div>
              <div style={{ width: 54, height: 3, background: "#d2643b", marginBottom: 46 }} />
              <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(25px, 3vw, 39px)", lineHeight: 1.13, margin: 0 }}>Le bon véhicule.<br /><i>Le bon itinéraire.</i></p>
              <p style={{ color: "#69766e", maxWidth: 285, fontSize: 14, lineHeight: 1.75, marginTop: 30 }}>Réseau intra-UE, conformité et immatriculation, TVA et garantie européenne.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 15 }}>
              <a href="#stock" style={{ background: "#d2643b", color: "#fff7eb", padding: "16px 22px", fontSize: 11, letterSpacing: ".13em", textDecoration: "none" }}>VOIR LE STOCK EUROPE&nbsp; →</a>
              <a href="#process" style={{ color: "#172a2a", fontSize: 11, letterSpacing: ".13em", textDecoration: "none", borderBottom: "1px solid #172a2a", paddingBottom: 4 }}>COMPRENDRE NOTRE PROCESS</a>
            </div>
          </div>
        </section>

        <section id="process" style={{ padding: "90px clamp(24px, 7vw, 110px) 102px", background: "#f4eee4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 30, marginBottom: 54, flexWrap: "wrap" }}>
            <div><p style={{ color: "#d2643b", fontSize: 11, letterSpacing: ".18em", margin: "0 0 17px" }}>01 — POURQUOI L'EUROPE</p><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(34px, 5vw, 64px)", lineHeight: .95, margin: 0 }}>Un achat qui<br /><i>voyage bien.</i></h2></div>
            <p style={{ maxWidth: 275, color: "#70796f", fontSize: 13, lineHeight: 1.7, margin: 0 }}>Chaque étape est pensée depuis Bertrange, avec la même attention qu'un itinéraire sur mesure.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 0, borderTop: "1px solid #cfc5b5" }}>
            {features.map(([number, title, desc]) => <article key={title} style={{ padding: "23px 20px 10px 0", marginRight: 20, borderRight: "1px solid #cfc5b5", minHeight: 165 }}><span style={{ color: "#d2643b", fontSize: 12 }}>{number}</span><h3 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, margin: "26px 0 11px" }}>{title}</h3><p style={{ color: "#72796f", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{desc}</p></article>)}
          </div>
        </section>

        <section id="stock" style={{ padding: "92px clamp(24px, 7vw, 110px) 112px", background: "#172a2a", color: "#f1eadf" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 42, gap: 20 }}><div><p style={{ color: "#e9a15c", fontSize: 11, letterSpacing: ".18em", margin: "0 0 17px" }}>02 — SÉLECTION DU MOMENT</p><h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 400, margin: 0, lineHeight: .9 }}>Véhicules<br /><i>disponibles</i></h2></div><a href="#contact" style={{ color: "#e9a15c", fontSize: 11, letterSpacing: ".14em", textDecoration: "none", borderBottom: "1px solid #e9a15c", paddingBottom: 6 }}>TOUT LE STOCK →</a></div>
          <div style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 12 }}>{vehicles.map((vehicle, index) => <InventoryCard key={vehicle.model} vehicle={vehicle} index={index} />)}</div>
        </section>

        <section id="reviews" style={{ padding: "88px clamp(24px, 7vw, 110px)", background: "#e5dccd" }}>
          <p style={{ color: "#d2643b", fontSize: 11, letterSpacing: ".18em", margin: "0 0 19px" }}>03 — AVIS CLIENTS</p>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(210px,.65fr) minmax(0,1.35fr)", gap: "clamp(28px, 8vw, 130px)", alignItems: "start" }}>
            <div><h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(38px, 5vw, 67px)", lineHeight: .93, margin: 0 }}>Ils nous<br /><i>font confiance.</i></h2><p style={{ color: "#d2643b", letterSpacing: ".12em", marginTop: 30 }}>★★★★★ <small style={{ color: "#6f776f", letterSpacing: 0 }}> 5/5 · Noté excellent</small></p></div>
            <div style={{ minHeight: 155 }}><p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(20px, 2.4vw, 31px)", lineHeight: 1.3, margin: 0 }}>“{reviews[current][1]}”</p><div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, color: "#6c766c", fontSize: 12 }}><span><b style={{ color: "#172a2a" }}>{reviews[current][0]}</b> · {reviews[current][2]}</span><span>GOOGLE</span></div><div style={{ display: "flex", gap: 7, marginTop: 32 }}>{reviews.map((_, index) => <button key={index} aria-label={`Avis ${index + 1}`} onClick={() => setCurrent(index)} style={{ width: index === current ? 28 : 8, height: 3, border: 0, padding: 0, background: index === current ? "#d2643b" : "#b6ad9f", transition: "width .25s" }} />)}</div></div>
          </div>
        </section>
      </main>
      <footer id="contact" style={{ background: "#d2643b", color: "#fff3e4", padding: "54px clamp(24px, 7vw, 110px)", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 38, fontSize: 12, lineHeight: 1.7 }}>
        <div><div style={{ fontFamily: "Georgia, serif", fontSize: 26 }}>MYG <i>Import</i></div><p>Votre partenaire pour l'importation de véhicules en Europe.</p><small>© 2026 MYG Import</small></div>
        <div><b style={{ letterSpacing: ".15em", fontSize: 10 }}>NAVIGATION</b><p><a href="#top" style={{ color: "inherit" }}>Accueil</a><br /><a href="#stock" style={{ color: "inherit" }}>Nos véhicules</a><br /><a href="#process" style={{ color: "inherit" }}>Importation</a></p></div>
        <div><b style={{ letterSpacing: ".15em", fontSize: 10 }}>CONTACT</b><p>8 Rue des Mérovingiens<br />8070 Bertrange - Luxembourg</p><p>contact@myg-import.com<br />+352 661 408 330</p></div>
      </footer>
      <style>{`@media (max-width: 760px){#top{margin-left:0!important}aside{display:none!important}header nav{display:none!important}main section:first-child{grid-template-columns:1fr!important}main section:first-child>div:first-child{min-height:430px!important}main section:nth-child(2)>div:last-child{grid-template-columns:1fr 1fr!important}main section:nth-child(2)>div:last-child article:nth-child(2n){border-right:0}footer{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}