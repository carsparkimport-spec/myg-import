import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Menu } from "lucide-react";
import "./redesign.css";

const image = (name: string) => `/__mockup/images/eu-home/${name}`;

export function Redesign() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [country, setCountry] = useState("Luxembourg");
  const [budget, setBudget] = useState("30 000 €");
  const [estimate, setEstimate] = useState("30 000 €");

  const estimatePrice = () => {
    const base = Number(budget.replace(/\D/g, "")) || 30000;
    const countryFee = country === "Luxembourg" ? 890 : country === "France" ? 1290 : 1590;
    setEstimate(`${(base + countryFee).toLocaleString("fr-FR")} €`);
  };

  return (
    <main className="eu-page">
      <div className="eu-topbar">
        <div className="eu-topbar-inner eu-wrap">
          <span>MYG Import · Bertrange, Luxembourg</span>
          <span>Sur rendez-vous · +352 661 408 330</span>
        </div>
      </div>
      <header className="eu-nav">
        <div className="eu-nav-inner eu-wrap">
          <a href="#accueil" aria-label="MYG Import, accueil"><img className="eu-logo" src={image("logo.png")} alt="MYG Import" /></a>
          <nav className={`eu-navlinks ${menuOpen ? "eu-navlinks-open" : ""}`}>
            <a href="#stock" onClick={() => setMenuOpen(false)}>Le stock</a>
            <a href="#methode" onClick={() => setMenuOpen(false)}>Notre méthode</a>
            <a href="#simulateur" onClick={() => setMenuOpen(false)}>Simulateur</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>À propos</a>
          </nav>
          <a className="eu-nav-cta" href="#contact">Parler à un expert <ArrowRight size={14} /></a>
          <button className="eu-menu" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={25} /></button>
        </div>
      </header>

      <section className="eu-hero" id="accueil">
        <div className="eu-hero-photo" />
        <div className="eu-hero-content">
          <div className="eu-kicker">Import automobile · Grand-Duché</div>
          <h1>La bonne voiture.<br /><em>Sans détour.</em></h1>
          <p className="eu-lede">Nous trouvons, contrôlons et livrons votre véhicule en Europe. Un interlocuteur unique, un prix lisible, une voiture prête à prendre la route.</p>
          <div className="eu-actions">
            <a className="eu-btn eu-btn-red" href="#stock">Découvrir le stock <ArrowRight size={16} /></a>
            <a className="eu-btn eu-btn-light" href="#simulateur">Calculer mon budget</a>
          </div>
        </div>
        <div className="eu-hero-note">De l'annonce à votre garage · 2024</div>
      </section>

      <section className="eu-trust">
        <div className="eu-wrap eu-trust-grid">
          <div className="eu-trust-item"><span className="eu-trust-number">01</span><span className="eu-trust-label">Prix annoncé<br />prix livré</span></div>
          <div className="eu-trust-item"><span className="eu-trust-number">02</span><span className="eu-trust-label">Contrôle<br />avant achat</span></div>
          <div className="eu-trust-item"><span className="eu-trust-number">03</span><span className="eu-trust-label">Démarches<br />prises en charge</span></div>
          <div className="eu-trust-item"><span className="eu-trust-number">04</span><span className="eu-trust-label">Garantie<br />européenne</span></div>
        </div>
      </section>

      <section className="eu-section eu-stock" id="stock">
        <div className="eu-wrap">
          <div className="eu-section-head">
            <div><div className="eu-eyebrow">Sélection du moment</div><h2>Des voitures qui ont quelque chose à dire.</h2></div>
            <p className="eu-section-intro">Chaque modèle est sélectionné pour son historique, son état et sa cohérence de prix. Pas de catalogue à rallonge : seulement les bonnes opportunités.</p>
          </div>
          <div className="eu-cars">
            <a className="eu-car" href="/eu/stock"><img src={image("car-1.jpeg")} alt="BMW Série 3 disponible à l'import" /><div className="eu-car-copy"><small>Berline · Allemagne</small><h3>BMW Série 3</h3><p>Historique limpide · Garantie incluse</p></div></a>
            <a className="eu-car" href="/eu/stock"><img src={image("car-2.png")} alt="Porsche 911 disponible à l'import" /><div className="eu-car-copy"><small>Sportive · Belgique</small><h3>Porsche 911</h3><p>Une configuration rare</p></div></a>
            <a className="eu-car" href="/eu/stock"><img src={image("car-3.png")} alt="Audi Q5 disponible à l'import" /><div className="eu-car-copy"><small>SUV · Pays-Bas</small><h3>Audi Q5</h3><p>Prêt à partir</p></div></a>
          </div>
          <div style={{ textAlign: "center", marginTop: 34 }}><a className="eu-btn eu-btn-red" href="/eu/stock">Voir tout le stock <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="eu-section eu-process" id="methode">
        <div className="eu-wrap">
          <div className="eu-section-head"><div><div className="eu-eyebrow">Notre méthode</div><h2>Vous choisissez.<br />Nous sécurisons.</h2></div><p className="eu-section-intro">L'import n'a rien de compliqué quand chaque étape est pilotée par la même équipe. Vous gardez le plaisir, nous gérons le reste.</p></div>
          <div className="eu-steps">
            <div className="eu-step"><span className="eu-step-num">01 / SOURCER</span><h3>Votre cahier des charges</h3><p>Modèle, usage, budget : nous clarifions ce qui compte avant de chercher.</p></div>
            <div className="eu-step"><span className="eu-step-num">02 / CONTRÔLER</span><h3>Une voiture vérifiée</h3><p>Historique, documents, inspection indépendante et négociation en votre nom.</p></div>
            <div className="eu-step"><span className="eu-step-num">03 / ACHEMINER</span><h3>Un transport suivi</h3><p>Le véhicule traverse l'Europe sur un transport sécurisé, avec suivi à chaque étape.</p></div>
            <div className="eu-step"><span className="eu-step-num">04 / LIVRER</span><h3>Prêt à rouler</h3><p>Conformité, immatriculation et remise des clés. Vous n'avez plus qu'à partir.</p></div>
          </div>
          <div style={{ marginTop: 43 }}><a className="eu-btn eu-btn-light" href="/eu/importation">Voir le détail du processus <ArrowRight size={16} /></a></div>
        </div>
      </section>

      <section className="eu-section" id="simulateur">
        <div className="eu-wrap eu-sim">
          <div><div className="eu-eyebrow">Le simulateur MYG</div><h2>Un budget clair avant le premier kilomètre.</h2><p className="eu-section-intro" style={{ marginTop: 22 }}>Estimez en quelques secondes le coût complet d'une importation. Notre équipe vous donnera ensuite un chiffre précis, sans surprise.</p><a href="#contact" style={{ color: "var(--red)", fontSize: 13, fontWeight: 700, display: "inline-flex", gap: 8, marginTop: 26, textDecoration: "none" }}>Besoin d'un conseil ? Écrivez-nous <ArrowRight size={15} /></a></div>
          <div className="eu-sim-card"><h3>Votre projet, en un coup d'œil</h3><p>Une première estimation, gratuite et sans engagement.</p><div className="eu-form-row"><div className="eu-field"><label>Destination</label><select value={country} onChange={(e) => setCountry(e.target.value)}><option>Luxembourg</option><option>France</option><option>Belgique</option></select></div><div className="eu-field"><label>Budget véhicule</label><select value={budget} onChange={(e) => setBudget(e.target.value)}><option>20 000 €</option><option>30 000 €</option><option>45 000 €</option><option>60 000 €</option></select></div></div><div className="eu-estimate"><span>Budget estimé livré</span><strong>{estimate}</strong></div><button className="eu-btn eu-btn-red" onClick={estimatePrice} style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>Actualiser l'estimation <ChevronDown size={15} /></button></div>
        </div>
      </section>

      <section className="eu-section eu-review">
        <div className="eu-wrap eu-review-grid"><div><div className="eu-eyebrow">Ils sont passés par MYG</div><h2>La confiance se construit sur des détails.</h2><div style={{ display: "flex", gap: 8, marginTop: 24, color: "var(--red)" }}><Check size={16} /><span style={{ color: "#5c605b", fontSize: 13 }}>5/5 · Avis Google vérifiés</span></div></div><div><p className="eu-quote">Du premier contact jusqu'à la remise du véhicule, tout a été clair, professionnel et humain.</p><p className="eu-review-by">— Thomas H. · Luxembourg</p></div></div>
      </section>

      <section className="eu-section" id="contact" style={{ paddingBottom: 100 }}><div className="eu-wrap eu-callout"><h3>Parlons de votre prochaine voiture.</h3><p>Un modèle précis en tête ou simplement envie d'y voir plus clair ? Mathieu vous répond directement.</p><div><a className="eu-btn eu-btn-red" href="mailto:contact@myg-import.com">Prendre contact <ArrowRight size={16} /></a></div></div></section>

      <footer className="eu-footer">
        <div className="eu-wrap eu-footer-grid">
          <div><img className="eu-footer-logo" src={image("logo.png")} alt="MYG Import" /><p>L'import automobile européen, pensé depuis le Luxembourg. Des voitures fiables, un accompagnement qui ne s'arrête pas aux clés.</p></div>
          <div><h4>Explorer</h4><a href="#stock">Le stock Europe</a><a href="#methode">Notre méthode</a><a href="#simulateur">Simulateur</a></div>
          <div><h4>Nous trouver</h4><a href="#contact">8 Rue des Mérovingiens</a><a href="#contact">8070 Bertrange</a><a href="tel:+352661408330">+352 661 408 330</a></div>
          <div><h4>Parlons voiture</h4><a href="mailto:contact@myg-import.com">contact@myg-import.com</a><a href="https://wa.me/352661408330">WhatsApp</a><a href="https://instagram.com/mygimportluxembourg">Instagram</a></div>
        </div>
        <div className="eu-wrap eu-copyright"><span>© 2024 MYG Import · RCS B288405</span><span>Conditions générales · Confidentialité</span></div>
      </footer>
    </main>
  );
}

export default Redesign;