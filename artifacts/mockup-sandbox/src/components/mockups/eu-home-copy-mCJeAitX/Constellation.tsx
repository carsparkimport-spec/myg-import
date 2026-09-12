import { useMemo, useState } from "react";

const inventory = [
  { image: "car-1.jpeg", make: "BMW", model: "M4 Competition", year: "2022", km: "32 500 km", price: "59 900 €", country: "Allemagne", score: "A+" },
  { image: "car-2.png", make: "Porsche", model: "911 Carrera", year: "2021", km: "18 200 km", price: "89 500 €", country: "Belgique", score: "A" },
  { image: "car-3.png", make: "Mercedes-Benz", model: "AMG GT", year: "2020", km: "41 800 km", price: "74 900 €", country: "Italie", score: "A" },
];

export default function Constellation() {
  const [active, setActive] = useState(0);
  const [budget, setBudget] = useState(80000);
  const [country, setCountry] = useState("Tous les pays");
  const [saved, setSaved] = useState<number[]>([]);
  const [contacted, setContacted] = useState(false);
  const vehicle = inventory[active];

  const visible = useMemo(() => inventory.filter((item) => {
    const underBudget = Number(item.price.replace(/\D/g, "")) <= budget;
    return underBudget && (country === "Tous les pays" || item.country === country);
  }), [budget, country]);

  return (
    <div style={{ minHeight: "100vh", background: "#e9edf0", color: "#172329", fontFamily: "'DM Sans', sans-serif" }}>
      <header style={{ height: 72, background: "#17323a", color: "#eef1ef", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(20px, 5vw, 78px)" }}>
        <a href="#atlas" style={{ display: "flex", alignItems: "center", gap: 12, color: "inherit", textDecoration: "none" }}>
          <img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" style={{ width: 90, filter: "brightness(0) invert(1)" }} />
          <span style={{ height: 20, width: 1, background: "#82969a" }} />
          <span style={{ fontSize: 10, letterSpacing: ".2em", color: "#b6c8c7" }}>VEHICLE ATLAS</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 12 }}>
          <span style={{ color: "#b6c8c7" }}>42 voitures suivies</span>
          <button onClick={() => setSaved([])} style={{ border: "1px solid #6b8589", background: "transparent", color: "#eef1ef", padding: "9px 14px", cursor: "pointer" }}>Ma shortlist ({saved.length})</button>
        </div>
      </header>

      <main id="atlas" style={{ maxWidth: 1320, margin: "0 auto", padding: "42px clamp(18px, 4vw, 58px) 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", borderBottom: "1px solid #bdc9cb", paddingBottom: 28, gap: 18, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: "0 0 10px", color: "#a66f43", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>MYG / Recherche guidée</p>
            <h1 style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 500, letterSpacing: "-.05em", lineHeight: .95 }}>L’Atlas des<br /><i>possibilités.</i></h1>
          </div>
          <p style={{ maxWidth: 285, margin: "0 0 3px", lineHeight: 1.55, color: "#617076", fontSize: 14 }}>Plutôt qu’un formulaire, une carte vivante de voitures contrôlées en Europe.</p>
        </div>

        <section style={{ display: "grid", gridTemplateColumns: "minmax(190px, .7fr) minmax(0, 1.55fr) minmax(280px, .9fr)", gap: 18, marginTop: 26, alignItems: "start" }}>
          <aside style={{ background: "#f4f6f5", border: "1px solid #ced9da", padding: 20 }}>
            <p style={{ margin: "0 0 24px", color: "#a66f43", fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>Affiner la carte</p>
            <label style={{ display: "block", fontSize: 12, color: "#647278", marginBottom: 9 }}>Pays d’origine</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: "100%", padding: "11px 0", border: 0, borderBottom: "1px solid #aebcbf", background: "transparent", color: "#172329", fontSize: 14, outline: "none" }}>
              <option>Tous les pays</option><option>Allemagne</option><option>Belgique</option><option>Italie</option>
            </select>
            <label style={{ display: "block", fontSize: 12, color: "#647278", margin: "28px 0 9px" }}>Budget maximum</label>
            <strong style={{ display: "block", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 25, fontWeight: 500 }}>{budget.toLocaleString("fr-FR")} €</strong>
            <input type="range" min="40000" max="100000" step="5000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} style={{ width: "100%", marginTop: 14, accentColor: "#a66f43" }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#89959a", fontSize: 10, marginTop: 6 }}><span>40k</span><span>100k</span></div>
            <div style={{ borderTop: "1px solid #d5dfe0", marginTop: 30, paddingTop: 18, color: "#647278", fontSize: 12, lineHeight: 1.6 }}>Chaque véhicule inclut une inspection indépendante, son historique et une estimation transport.</div>
          </aside>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, color: "#647278", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase" }}><span>{visible.length} correspondances</span><span>Tri : pertinence</span></div>
            <div style={{ display: "grid", gap: 10 }}>
              {visible.map((item) => {
                const index = inventory.indexOf(item);
                return <button key={item.model} onClick={() => setActive(index)} style={{ textAlign: "left", display: "grid", gridTemplateColumns: "112px 1fr auto", gap: 16, alignItems: "center", padding: 10, background: active === index ? "#17323a" : "#f4f6f5", color: active === index ? "#eef1ef" : "#172329", border: active === index ? "1px solid #17323a" : "1px solid #ced9da", cursor: "pointer" }}>
                  <img src={`/__mockup/images/eu-home/${item.image}`} alt={`${item.make} ${item.model}`} style={{ width: 112, height: 82, objectFit: "cover" }} />
                  <span><small style={{ display: "block", color: active === index ? "#a9c0c0" : "#758287", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase" }}>{item.make} · {item.country}</small><strong style={{ display: "block", marginTop: 6, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 500 }}>{item.model}</strong><span style={{ display: "block", marginTop: 6, color: active === index ? "#b9caca" : "#758287", fontSize: 11 }}>{item.year} · {item.km}</span></span>
                  <strong style={{ alignSelf: "start", paddingTop: 4, fontSize: 14 }}>{item.price}</strong>
                </button>;
              })}
            </div>
            {visible.length === 0 && <div style={{ padding: 35, background: "#f4f6f5", color: "#647278" }}>Aucune voiture dans cette zone. Élargissez votre budget ou le pays.</div>}
          </div>

          <article style={{ background: "#d8e1e1", padding: 24, minHeight: 390 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}><span style={{ color: "#a66f43", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700 }}>Dossier sélectionné</span><span style={{ background: "#17323a", color: "#dce9e8", padding: "5px 8px", fontSize: 10 }}>VÉRIFIÉ {vehicle.score}</span></div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: 35, lineHeight: 1, margin: "40px 0 8px" }}>{vehicle.make}<br /><i>{vehicle.model}</i></h2>
            <p style={{ color: "#627277", fontSize: 13, lineHeight: 1.55, marginBottom: 24 }}>Un exemplaire repéré à {vehicle.country}, prêt à faire le trajet jusqu’à votre adresse.</p>
            <div style={{ borderTop: "1px solid #b8c8c9", borderBottom: "1px solid #b8c8c9", padding: "16px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><span style={{ color: "#748287", fontSize: 11 }}>Prix estimé<br /><strong style={{ color: "#172329", fontSize: 17, fontWeight: 500 }}>{vehicle.price}</strong></span><span style={{ color: "#748287", fontSize: 11 }}>Acheminement<br /><strong style={{ color: "#172329", fontSize: 17, fontWeight: 500 }}>dès 1 250 €</strong></span></div>
            <button onClick={() => setSaved(saved.includes(active) ? saved.filter((x) => x !== active) : [...saved, active])} style={{ width: "100%", marginTop: 22, padding: "13px 12px", border: "1px solid #17323a", background: saved.includes(active) ? "#17323a" : "transparent", color: saved.includes(active) ? "#eef1ef" : "#17323a", cursor: "pointer", fontSize: 12 }}>{saved.includes(active) ? "Dans votre shortlist" : "Ajouter à ma shortlist"} <span style={{ float: "right" }}>+</span></button>
            <button onClick={() => setContacted(true)} style={{ width: "100%", marginTop: 8, padding: "14px 12px", border: 0, background: "#a66f43", color: "#fffaf3", cursor: "pointer", fontSize: 12 }}>{contacted ? "Demande envoyée — merci" : "Parler à un conseiller"} <span style={{ float: "right" }}>→</span></button>
          </article>
        </section>
      </main>
      <footer style={{ background: "#17323a", color: "#dce9e8", padding: "28px clamp(20px, 5vw, 78px)", display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", fontSize: 11 }}><span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22 }}>MYG Import</span><span style={{ color: "#9db1b2" }}>Bertrange · Luxembourg</span><span style={{ color: "#d8b58e" }}>contact@myg-import.com</span></footer>
    </div>
  );
}