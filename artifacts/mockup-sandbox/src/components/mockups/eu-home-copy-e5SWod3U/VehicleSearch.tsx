import { FormEvent, useState } from "react";
import "./current.css";
import "./EuHomeCopyE5SWod3U.css";
import "./VehicleSearch.css";

const makes = ["Toutes marques", "Toyota", "Renault", "Dacia", "BYD", "BMW", "Mercedes", "Hyundai", "Volkswagen", "Audi"];

export default function VehicleSearch() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ make: "Toutes marques", model: "", energy: "Hybride ou thermique", budget: "30 000 €", usage: "À préciser" });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="eu-page eu-search-page">
      <header className="eu-header eu-search-header">
        <a href="/__mockup/preview/eu-home-copy-e5SWod3U/EuHomeCopyE5SWod3U" className="eu-logo-link">
          <img src="/__mockup/images/eu-home/logo.png" alt="MYG Import" />
        </a>
        <a href="/__mockup/preview/eu-home-copy-e5SWod3U/EuHomeCopyE5SWod3U" className="eu-search-back">← Retour à l’accueil</a>
      </header>
      <main className="eu-search-main">
        <section className="eu-search-intro">
          <div className="eu-eyebrow">Recherche automobile en Europe</div>
          <h1>Décrivez-nous<br /><em>votre prochain véhicule.</em></h1>
          <p>Nous recherchons les meilleures opportunités disponibles partout en Europe, selon vos critères, votre usage et votre budget.</p>
          <div className="eu-search-proof"><span>01</span><b>Vos critères</b><span>02</span><b>Notre recherche</b><span>03</span><b>Votre véhicule</b></div>
        </section>
        <section className="eu-search-card" aria-label="Moteur de recherche de véhicule">
          {submitted ? (
            <div className="eu-search-success">
              <span className="eu-success-mark">✓</span>
              <div className="eu-eyebrow">Demande enregistrée</div>
              <h2>Votre recherche est lancée.</h2>
              <p>Nous allons étudier les opportunités correspondant à vos critères et revenir vers vous rapidement.</p>
              <a href="/__mockup/preview/eu-home-copy-e5SWod3U/EuHomeCopyE5SWod3U" className="eu-button">Retour à l’accueil</a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="eu-search-card-head"><span>Votre recherche</span><small>Étape 1 sur 1</small></div>
              <div className="eu-search-fields">
                <label>Marque préférée
                  <select value={form.make} onChange={(event) => setForm({ ...form, make: event.target.value })}>{makes.map((make) => <option key={make}>{make}</option>)}</select>
                </label>
                <label>Modèle ou carrosserie
                  <input value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} placeholder="Ex. Yaris, SUV, break..." />
                </label>
                <label>Motorisation
                  <select value={form.energy} onChange={(event) => setForm({ ...form, energy: event.target.value })}>
                    <option>Hybride ou thermique</option><option>Hybride rechargeable</option><option>Électrique</option><option>Sans préférence</option>
                  </select>
                </label>
                <label>Budget maximum
                  <select value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}>
                    <option>15 000 €</option><option>20 000 €</option><option>25 000 €</option><option>30 000 €</option><option>40 000 €</option><option>À définir ensemble</option>
                  </select>
                </label>
                <label className="eu-search-wide">Votre usage
                  <select value={form.usage} onChange={(event) => setForm({ ...form, usage: event.target.value })}><option>À préciser</option><option>Trajets quotidiens</option><option>Famille et vacances</option><option>Longs trajets professionnels</option></select>
                </label>
              </div>
              <button className="eu-button eu-search-submit" type="submit">Lancer ma recherche <span>→</span></button>
              <small className="eu-search-note">Recherche sans engagement · Réponse personnalisée · Véhicules disponibles dans toute l’Europe</small>
            </form>
          )}
        </section>
      </main>
      <footer className="eu-search-footer">MYG Import · Recherche multimarque en Europe · Luxembourg</footer>
    </div>
  );
}