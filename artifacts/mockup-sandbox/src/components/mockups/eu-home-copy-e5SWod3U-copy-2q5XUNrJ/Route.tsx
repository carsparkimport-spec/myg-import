import { useMemo, useState } from "react";

const vehicles = [
  { image: "car-1.jpeg", make: "BMW", model: "M4 Competition", year: "2022", mileage: "32 500 km", price: "59 900 €", tag: "Le plus demandé" },
  { image: "car-2.png", make: "Porsche", model: "911 Carrera", year: "2021", mileage: "18 200 km", price: "89 500 €", tag: "Faible kilométrage" },
  { image: "car-3.png", make: "Mercedes-Benz", model: "AMG GT", year: "2020", mileage: "41 800 km", price: "74 900 €", tag: "Nouveau" },
];

const steps = ["Votre projet", "Le bon véhicule", "Livraison"];

export default function Route() {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState("60 000 €");
  const [country, setCountry] = useState("Allemagne");
  const [selected, setSelected] = useState(0);
  const [saved, setSaved] = useState<number[]>([]);

  const selectedVehicle = vehicles[selected];
  const savedCount = saved.length;
  const summary = useMemo(() => step === 0 ? "Dites-nous où vous voulez aller." : step === 1 ? "Trois options, un choix simple." : "On s’occupe du dernier kilomètre.", [step]);

  return (
    <div style={{ minHeight: "100vh", background: "#f2efe9", color: "#1b2420", fontFamily: "'DM Sans', sans-serif" }}>
      <header style={{ height: 76, borderBottom: "1px solid #d9d5cc", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(22px, 6vw, 92px)", background: "#f6f3ed" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}><img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" style={{ width: 92 }} /><span style={{ fontSize: 11, letterSpacing: ".14em", color: "#7a8179" }}>IMPORT / EU</span></a>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#route" style={{ color: "#1b2420", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>Construire mon projet</a>
          <a href="#stock" style={{ color: "#68716b", textDecoration: "none", fontSize: 13 }}>Le stock</a>
          <button onClick={() => setSaved(saved.length ? [] : [0])} style={{ border: "1px solid #bdc3ba", borderRadius: 30, background: "transparent", padding: "10px 15px", color: "#1b2420", fontSize: 12, cursor: "pointer" }}>Sélection {savedCount ? `(${savedCount})` : ""}</button>
        </nav>
      </header>

      <main id="top" style={{ maxWidth: 1220, margin: "0 auto", padding: "0 22px 80px" }}>
        <section id="route" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, .9fr)", gap: 64, padding: "88px 0 78px", alignItems: "end" }}>
          <div>
            <p style={{ textTransform: "uppercase", letterSpacing: ".19em", fontSize: 11, color: "#8a6b48", fontWeight: 700, margin: "0 0 24px" }}>Le parcours MYG / 01</p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(54px, 8vw, 112px)", fontWeight: 500, lineHeight: .9, letterSpacing: "-.06em", margin: 0 }}>Votre voiture.<br /><i style={{ color: "#8a6b48" }}>Votre itinéraire.</i></h1>
            <p style={{ maxWidth: 440, color: "#667069", fontSize: 17, lineHeight: 1.55, margin: "32px 0 0" }}>{summary} Un accompagnement clair, du premier filtre jusqu’à votre plaque.</p>
          </div>
          <div style={{ background: "#1e2a25", color: "#eff0e9", padding: 28, minHeight: 180, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 190, height: 190, border: "1px solid #b6a183", borderRadius: "50%", right: -58, top: -75, opacity: .6 }} />
            <div style={{ position: "absolute", width: 125, height: 125, border: "1px solid #b6a183", borderRadius: "50%", right: -25, top: -42, opacity: .4 }} />
            <p style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#c8b393", margin: 0 }}>En ce moment</p>
            <strong style={{ display: "block", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 500, marginTop: 25 }}>42 véhicules<br />déjà vérifiés</strong>
            <span style={{ display: "block", color: "#b6c0b5", fontSize: 12, marginTop: 14 }}>dans 7 pays européens</span>
          </div>
        </section>

        <section style={{ borderTop: "1px solid #cfcac0", paddingTop: 26 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 34 }}>
            <div style={{ display: "flex", gap: 0, flex: 1, maxWidth: 650 }}>
              {steps.map((label, index) => <button key={label} onClick={() => setStep(index)} style={{ flex: 1, textAlign: "left", border: 0, borderTop: `3px solid ${index <= step ? "#8a6b48" : "#d1cdc3"}`, background: "none", padding: "13px 8px 0 0", color: index === step ? "#1b2420" : "#8b918a", fontSize: 12, cursor: "pointer", fontWeight: index === step ? 700 : 400 }}>{String(index + 1).padStart(2, "0")} / {label}</button>)}
            </div>
            <span style={{ fontSize: 12, color: "#8b918a" }}>Étape {step + 1} sur 3</span>
          </div>

          {step === 0 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, maxWidth: 850 }}>
            <label style={{ background: "#e7e3db", padding: 24, display: "block" }}> <span style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em", color: "#7a8179", marginBottom: 16 }}>Je cherche en</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: "100%", border: 0, borderBottom: "1px solid #9ea59e", background: "transparent", padding: "0 0 10px", fontSize: 22, color: "#1b2420", outline: "none" }}><option>Allemagne</option><option>Belgique</option><option>Italie</option><option>Pays-Bas</option></select>
            </label>
            <label style={{ background: "#e7e3db", padding: 24, display: "block" }}> <span style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em", color: "#7a8179", marginBottom: 16 }}>Mon budget maximum</span>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: "100%", border: 0, borderBottom: "1px solid #9ea59e", background: "transparent", padding: "0 0 10px", fontSize: 22, color: "#1b2420", outline: "none" }}><option>40 000 €</option><option>60 000 €</option><option>80 000 €</option><option>100 000 €</option></select>
            </label>
            <button onClick={() => setStep(1)} style={{ gridColumn: "1 / -1", justifySelf: "start", background: "#8a6b48", border: 0, color: "#faf8f3", padding: "16px 24px", fontSize: 13, cursor: "pointer" }}>Voir les correspondances <span style={{ marginLeft: 30 }}>→</span></button>
          </div>}

          {step === 1 && <div id="stock"><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>{vehicles.map((v, index) => <article key={v.model} style={{ background: "#e7e3db", border: index === selected ? "2px solid #8a6b48" : "2px solid transparent", cursor: "pointer" }} onClick={() => setSelected(index)}>
            <div style={{ position: "relative", height: 170, overflow: "hidden" }}><img src={`/__mockup/images/eu-home/${v.image}`} alt={`${v.make} ${v.model}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} /><span style={{ position: "absolute", left: 12, top: 12, background: "#f2efe9", padding: "6px 8px", fontSize: 10 }}>{v.tag}</span></div>
            <div style={{ padding: 18 }}><p style={{ margin: 0, color: "#7a8179", fontSize: 11 }}>{v.make}</p><h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500, fontSize: 23, margin: "5px 0 14px" }}>{v.model}</h3><p style={{ fontSize: 12, color: "#68716b", margin: 0 }}>{v.year} · {v.mileage}</p><strong style={{ display: "block", marginTop: 18, fontSize: 18 }}>{v.price}</strong></div>
          </article>)}</div><div style={{ display: "flex", gap: 12, marginTop: 25 }}><button onClick={() => setSaved(saved.includes(selected) ? saved.filter((x) => x !== selected) : [...saved, selected])} style={{ padding: "14px 20px", border: "1px solid #8a6b48", color: "#8a6b48", background: "transparent", cursor: "pointer" }}>{saved.includes(selected) ? "Retirer de ma sélection" : "Garder ce véhicule"}</button><button onClick={() => setStep(2)} style={{ padding: "14px 22px", border: 0, color: "#faf8f3", background: "#1e2a25", cursor: "pointer" }}>Organiser la suite →</button></div></div>}

          {step === 2 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}><div><p style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: ".14em", color: "#8a6b48" }}>Votre choix</p><h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 46, fontWeight: 500, margin: "12px 0" }}>{selectedVehicle.make}<br /><i>{selectedVehicle.model}</i></h2><p style={{ color: "#68716b", lineHeight: 1.6 }}>Nous vérifions le dossier, organisons le transport depuis {country} et vous envoyons un calendrier précis avant toute réservation.</p></div><div style={{ background: "#1e2a25", padding: 28, color: "#eff0e9" }}><p style={{ color: "#c8b393", textTransform: "uppercase", letterSpacing: ".14em", fontSize: 11 }}>La prochaine étape</p><h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 29, fontWeight: 500 }}>Parlons de votre projet.</h3><p style={{ color: "#b6c0b5", fontSize: 14, lineHeight: 1.5 }}>Un conseiller MYG vous rappelle sous 24 h pour confirmer la disponibilité et le coût total.</p><a href="#contact" style={{ display: "inline-block", color: "#1e2a25", background: "#d8c6a5", padding: "14px 18px", textDecoration: "none", fontSize: 13, marginTop: 12 }}>Demander mon estimation →</a></div></div>}
        </section>
      </main>
      <footer id="contact" style={{ background: "#1e2a25", color: "#e8e8df", padding: "32px clamp(22px, 6vw, 92px)", display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}><span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 25 }}>MYG Import</span><span style={{ color: "#aeb8ae", fontSize: 12 }}>8 Rue des Mérovingiens · Bertrange, Luxembourg</span><span style={{ color: "#d8c6a5", fontSize: 12 }}>contact@myg-import.com</span></footer>
    </div>
  );
}