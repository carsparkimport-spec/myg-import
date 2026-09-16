import { useMemo, useState } from "react";

type Step = "budget" | "energy" | "body";

const options: Record<Step, string[]> = {
  budget: ["Moins de 25 000 €", "25 000 — 35 000 €", "35 000 — 50 000 €", "Je veux comparer"],
  energy: ["Essence / Diesel", "Hybride", "Électrique", "Je ne sais pas encore"],
  body: ["Citadine", "SUV / Familiale", "Berline", "Utilitaire"],
};

const cars = [
  { image: "car-3.png", name: "Toyota Yaris Hybrid", meta: "2024 · 21 800 km", price: "22 490 €", tag: "Meilleur équilibre" },
  { image: "car-2.png", name: "BYD Seal U DM-i", meta: "2025 · 15 000 km", price: "33 490 €", tag: "Disponible maintenant" },
  { image: "car-1.jpeg", name: "BMW Série 3 Touring", meta: "2022 · 32 500 km", price: "31 900 €", tag: "Très recherché" },
];

const stepLabels: { id: Step; label: string; index: string }[] = [
  { id: "budget", label: "Budget", index: "01" },
  { id: "energy", label: "Motorisation", index: "02" },
  { id: "body", label: "Format", index: "03" },
];

export default function EuHomeGuided() {
  const [step, setStep] = useState<Step>("budget");
  const [answers, setAnswers] = useState<Partial<Record<Step, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const stepIndex = stepLabels.findIndex((item) => item.id === step);
  const currentOptions = options[step];
  const progress = `${Math.round(((stepIndex + (answers[step] ? 1 : 0)) / stepLabels.length) * 100)}%`;

  const recommendation = useMemo(() => {
    if (answers.energy === "Électrique") return "BYD Seal U DM-i";
    if (answers.body === "Citadine") return "Toyota Yaris Hybrid";
    return "BMW Série 3 Touring";
  }, [answers]);

  const selectAnswer = (value: string) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    if (stepIndex < stepLabels.length - 1) setStep(stepLabels[stepIndex + 1].id);
    else setSubmitted(true);
  };

  const restart = () => {
    setAnswers({});
    setStep("budget");
    setSubmitted(false);
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#f2eee8", color: "#1e2828", fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        .guided-link { color: inherit; text-decoration: none; }
        .guided-option { transition: transform .2s ease, background-color .2s ease, border-color .2s ease; }
        .guided-option:hover { transform: translateX(5px); background: #dce6dd !important; border-color: #58715f !important; }
        .guided-card { transition: transform .25s ease, box-shadow .25s ease; }
        .guided-card:hover { transform: translateY(-6px); box-shadow: 0 18px 35px rgba(31,49,43,.14); }
        @media (max-width: 760px) {
          .guided-nav { padding: 18px 20px !important; }
          .guided-nav-links { display: none !important; }
          .guided-hero { grid-template-columns: 1fr !important; }
          .guided-panel { min-height: auto !important; padding: 34px 22px !important; }
          .guided-image { min-height: 330px !important; }
          .guided-cards { grid-template-columns: 1fr !important; }
          .guided-footer { padding: 28px 20px !important; }
        }
      `}</style>

      <header className="guided-nav" style={{ height: 78, padding: "18px 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #d9d4ca" }}>
        <a className="guided-link" href="#top" style={{ display: "flex", alignItems: "center", gap: 11, fontWeight: 700, letterSpacing: ".08em", fontSize: 13 }}>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#ba4d36", color: "#fdf9f3", display: "grid", placeItems: "center", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>M</span>
          MYG <span style={{ color: "#ba4d36" }}>IMPORT</span>
        </a>
        <nav className="guided-nav-links" style={{ display: "flex", gap: 28, fontSize: 13, color: "#64706a" }}>
          <a className="guided-link" href="#matching">Le matching</a>
          <a className="guided-link" href="#opportunities">Opportunités</a>
          <a className="guided-link" href="#contact">Parler à un expert</a>
        </nav>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".12em", color: "#6b756f" }}>LUXEMBOURG · EU</span>
      </header>

      <main id="top">
        <section className="guided-hero" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.06fr) minmax(390px, .94fr)", maxWidth: 1440, margin: "0 auto", minHeight: 650 }}>
          <div className="guided-panel" style={{ padding: "clamp(42px, 7vw, 105px) clamp(24px, 7vw, 105px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#ba4d36", letterSpacing: ".16em", marginBottom: 26 }}>MYG / VOTRE RECHERCHE, ENFIN SIMPLE</div>
            <h1 style={{ fontSize: "clamp(44px, 6.2vw, 84px)", lineHeight: .98, letterSpacing: "-.06em", fontWeight: 500, margin: 0, maxWidth: 650 }}>La bonne voiture<br /><em style={{ color: "#ba4d36", fontFamily: "Georgia, serif", fontWeight: 400 }}>existe déjà.</em></h1>
            <p style={{ maxWidth: 450, color: "#5e6962", lineHeight: 1.65, fontSize: 16, margin: "28px 0 0" }}>Répondez à trois questions. Nous parcourons les stocks européens et vous présentons uniquement les voitures qui ont du sens pour vous.</p>
            <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12, color: "#657169", fontSize: 12 }}>
              <span style={{ width: 34, height: 1, background: "#ba4d36" }} /> Aucun catalogue à trier. Aucun compromis à deviner.
            </div>
          </div>
          <div className="guided-image" style={{ position: "relative", minHeight: 650, backgroundImage: 'url("/__mockup/images/eu-home-copy-e5SWod3U-summer-hero.png")', backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,34,31,.06), rgba(21,34,31,.56))" }} />
            <div style={{ position: "absolute", bottom: 34, left: 34, right: 34, color: "#f8f3eb" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: ".14em", opacity: .8 }}>SOURCÉE EN EUROPE · LIVRÉE CHEZ VOUS</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 14 }}>
                <strong style={{ fontSize: 28, fontWeight: 500 }}>De Bruxelles à Bertrange</strong>
                <span style={{ fontSize: 11, border: "1px solid rgba(255,255,255,.5)", padding: "8px 10px" }}>01 / 03</span>
              </div>
            </div>
          </div>
        </section>

        <section id="matching" style={{ background: "#1f312b", color: "#f5f0e7", padding: "clamp(50px, 8vw, 100px) 5vw" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(220px, .7fr) minmax(0, 1.3fr)", gap: "clamp(36px, 8vw, 120px)" }}>
            <div>
              <div style={{ color: "#d98768", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".14em" }}>LE CONCIERGE MYG</div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 54px)", lineHeight: 1.05, letterSpacing: "-.05em", fontWeight: 500, margin: "22px 0" }}>Pas un moteur.<br />Un regard.</h2>
              <p style={{ color: "#b6c0b8", lineHeight: 1.7, fontSize: 14, maxWidth: 280 }}>Votre recherche avance une question à la fois. Vous gardez le contrôle, nous faisons le tri.</p>
              <div style={{ marginTop: 42, display: "flex", gap: 18, fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#9cac9f" }}>
                <span style={{ color: "#d98768" }}>{progress}</span><span>de votre brief</span>
              </div>
              <div style={{ height: 2, background: "#42564c", marginTop: 14, maxWidth: 230 }}><div style={{ height: "100%", width: progress, background: "#d98768", transition: "width .35s ease" }} /></div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", gap: 9, borderBottom: "1px solid #42564c", paddingBottom: 18, marginBottom: 34 }}>
                {stepLabels.map((item) => <button key={item.id} onClick={() => setStep(item.id)} style={{ border: 0, background: "none", color: step === item.id ? "#f5f0e7" : "#789080", padding: 0, marginRight: 14, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11 }}><span style={{ color: step === item.id ? "#d98768" : "inherit", marginRight: 8 }}>{item.index}</span>{item.label}</button>)}
              </div>
              {!submitted ? <div>
                <h3 style={{ fontSize: "clamp(25px, 3vw, 38px)", fontWeight: 500, margin: 0, letterSpacing: "-.04em" }}>{step === "budget" ? "Quel budget doit respecter votre recherche ?" : step === "energy" ? "Quelle énergie vous ressemble ?" : "Quel format vous accompagne au quotidien ?"}</h3>
                <div style={{ display: "grid", gap: 10, marginTop: 29 }}>
                  {currentOptions.map((option, index) => <button className="guided-option" key={option} onClick={() => selectAnswer(option)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid #42564c", background: answers[step] === option ? "#d98768" : "transparent", color: "#f5f0e7", padding: "17px 19px", fontSize: 15, borderRadius: 1 }}><span>{option}</span><span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: answers[step] === option ? "#1f312b" : "#83978a" }}>0{index + 1} ↗</span></button>)}
                </div>
              </div> : <div style={{ border: "1px solid #61756a", padding: "30px 28px", background: "#294239" }}>
                <div style={{ color: "#d98768", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".12em" }}>VOTRE PREMIÈRE PISTE</div>
                <h3 style={{ fontSize: 34, fontWeight: 500, margin: "16px 0 10px" }}>{recommendation}</h3>
                <p style={{ color: "#b6c0b8", lineHeight: 1.6, margin: 0, fontSize: 14 }}>Notre équipe peut affiner cette sélection avec vous, puis gérer le transport et les documents de A à Z.</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 25 }}><a href="#contact" style={{ background: "#d98768", color: "#1f312b", padding: "13px 17px", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>Recevoir ma sélection</a><button onClick={restart} style={{ background: "transparent", color: "#f5f0e7", border: "1px solid #61756a", padding: "12px 17px", cursor: "pointer", fontSize: 13 }}>Recommencer</button></div>
              </div>}
            </div>
          </div>
        </section>

        <section id="opportunities" style={{ padding: "clamp(54px, 8vw, 105px) 5vw", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 25, marginBottom: 30, flexWrap: "wrap" }}>
            <div><div style={{ color: "#ba4d36", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".14em" }}>VUES CETTE SEMAINE</div><h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: "-.05em", fontWeight: 500, margin: "15px 0 0" }}>Des opportunités,<br /><em style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}>pas du remplissage.</em></h2></div>
            <p style={{ color: "#68746c", maxWidth: 280, lineHeight: 1.6, fontSize: 14, margin: 0 }}>Une sélection courte de véhicules réellement disponibles auprès de nos partenaires européens.</p>
          </div>
          <div className="guided-cards" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr 1fr", gap: 16 }}>
            {cars.map((car, index) => <article className="guided-card" key={car.name} style={{ background: "#fffaf3", border: "1px solid #ddd6ca", paddingBottom: 20 }}>
              <div style={{ height: index === 0 ? 235 : 205, overflow: "hidden", background: "#d7ddd7" }}><img src={`/__mockup/images/eu-home/${car.image}`} alt={car.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
              <div style={{ padding: "18px 19px 0" }}><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#ba4d36", letterSpacing: ".08em" }}>{car.tag}</div><h3 style={{ fontSize: 20, fontWeight: 600, margin: "10px 0 8px" }}>{car.name}</h3><p style={{ color: "#738078", fontSize: 13, margin: 0 }}>{car.meta}</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid #e0dad0" }}><strong style={{ fontSize: 17 }}>{car.price}</strong><a href="#contact" className="guided-link" style={{ color: "#ba4d36", fontSize: 12, fontWeight: 700 }}>Voir la fiche →</a></div></div>
            </article>)}
          </div>
        </section>
      </main>

      <footer id="contact" className="guided-footer" style={{ background: "#ba4d36", color: "#fff8ef", padding: "42px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 25, flexWrap: "wrap" }}>
        <div><div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: ".12em", marginBottom: 12 }}>MYG IMPORT</div><strong style={{ fontSize: 24, fontWeight: 500 }}>On commence par votre besoin.</strong></div>
        <a href="mailto:contact@myg-import.com" style={{ color: "#fff8ef", borderBottom: "1px solid rgba(255,255,255,.65)", paddingBottom: 5, textDecoration: "none", fontSize: 14 }}>contact@myg-import.com ↗</a>
      </footer>
    </div>
  );
}