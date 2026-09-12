import { useMemo, useState } from "react";

type Vehicle = {
  id: number;
  city: string;
  country: string;
  make: string;
  model: string;
  price: string;
  year: string;
  km: string;
  image: string;
  x: string;
  y: string;
};

const vehicles: Vehicle[] = [
  { id: 1, city: "Düsseldorf", country: "DE", make: "BMW", model: "Série 3 Touring", price: "31 900 €", year: "2022", km: "32 500 km", image: "car-1.jpeg", x: "57%", y: "30%" },
  { id: 2, city: "Amsterdam", country: "NL", make: "BYD", model: "Seal U DM-i", price: "33 490 €", year: "2025", km: "15 000 km", image: "car-2.png", x: "48%", y: "22%" },
  { id: 3, city: "Lyon", country: "FR", make: "Toyota", model: "Yaris Hybrid", price: "22 490 €", year: "2024", km: "21 800 km", image: "car-3.png", x: "39%", y: "58%" },
];

export default function RoutePlanner() {
  const [active, setActive] = useState(vehicles[0]);
  const [filter, setFilter] = useState("Tous");
  const [saved, setSaved] = useState<number[]>([]);
  const [sent, setSent] = useState(false);
  const visible = useMemo(() => filter === "Tous" ? vehicles : vehicles.filter((v) => v.country === filter), [filter]);

  return (
    <div className="rp-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box}.rp-shell{min-height:100vh;background:#f3f1eb;color:#18201e;font-family:Manrope,sans-serif}.rp-top{height:70px;border-bottom:1px solid #d6d6ce;background:#f8f7f2;display:flex;align-items:center;padding:0 4vw;justify-content:space-between}.rp-brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:-.05em;font-size:20px}.rp-brand i{display:block;width:24px;height:24px;border:2px solid #e04a32;border-radius:50%;position:relative}.rp-brand i:after{content:'';position:absolute;width:6px;height:6px;background:#e04a32;border-radius:50%;left:7px;top:7px}.rp-nav{display:flex;gap:30px;font-size:12px;color:#68706c}.rp-nav a{color:inherit;text-decoration:none}.rp-nav a:first-child{color:#18201e;font-weight:800}.rp-top button{border:1px solid #1e2724;background:transparent;padding:10px 18px;border-radius:2px;font:600 11px Manrope;cursor:pointer}.rp-intro{padding:44px 5vw 30px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px}.rp-kicker{font:500 10px "DM Mono",monospace;letter-spacing:.15em;text-transform:uppercase;color:#e04a32;margin-bottom:15px}.rp-intro h1{font-size:clamp(34px,5vw,66px);line-height:.98;letter-spacing:-.075em;margin:0;max-width:640px;font-weight:700}.rp-intro p{max-width:360px;line-height:1.6;color:#68706c;font-size:13px;margin:0 0 4px}.rp-workspace{margin:0 5vw 26px;border:1px solid #c9cbc2;background:#e6e7df;display:grid;grid-template-columns:minmax(0,1.4fr) minmax(340px,.8fr);min-height:520px}.rp-map{position:relative;overflow:hidden;min-height:510px;background-color:#dfe2d9;background-image:linear-gradient(33deg,transparent 49.5%,#c7cec3 50%,transparent 50.6%),linear-gradient(112deg,transparent 49.5%,#c7cec3 50%,transparent 50.6%),linear-gradient(7deg,transparent 49%,#d1d5cc 49.5%,transparent 50.2%);background-size:220px 170px,190px 220px,280px 230px}.rp-map:before{content:'EUROPE / SOURCING NETWORK';position:absolute;top:24px;left:26px;font:500 10px "DM Mono";letter-spacing:.13em;color:#718079}.rp-map:after{content:'LUXEMBOURG';position:absolute;left:32%;top:49%;font:500 9px "DM Mono";color:#84908a;letter-spacing:.13em;transform:rotate(-8deg)}.route{position:absolute;left:39%;top:30%;width:20%;height:29%;border-left:1px dashed #e04a32;border-bottom:1px dashed #e04a32;transform:skewY(22deg);opacity:.8}.map-label{position:absolute;font:500 9px "DM Mono";color:#818d87;letter-spacing:.08em}.label-de{left:60%;top:27%}.label-nl{left:48%;top:19%}.label-fr{left:36%;top:62%}.marker{position:absolute;transform:translate(-50%,-100%);border:0;background:none;cursor:pointer}.marker-pin{display:block;width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#e04a32;border:3px solid #f4f1e9;box-shadow:0 2px 6px #62685d66}.marker span{display:block;font:600 10px "DM Mono";margin-top:8px;white-space:nowrap;transform:translateX(-18%);color:#26312c}.marker.active .marker-pin{background:#18201e;width:23px;height:23px}.rp-legend{position:absolute;left:25px;bottom:24px;display:flex;gap:18px;font-size:10px;color:#69746e;background:#edf0e8cc;padding:10px 12px}.rp-legend b{display:inline-block;width:7px;height:7px;background:#e04a32;border-radius:50%;margin-right:5px}.rp-detail{background:#f8f7f2;padding:29px 29px 25px;display:flex;flex-direction:column}.rp-detail-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:27px}.rp-detail-top small{font:500 10px "DM Mono";color:#e04a32;letter-spacing:.09em}.rp-save{border:0;background:none;font-size:20px;color:#9aa19b;cursor:pointer}.rp-save.on{color:#e04a32}.rp-image{height:155px;overflow:hidden;background:#d8d9d2;margin-bottom:23px}.rp-image img{width:100%;height:100%;object-fit:cover}.rp-detail h2{font-size:27px;letter-spacing:-.06em;line-height:1;margin:0 0 10px}.rp-city{font:500 10px "DM Mono";letter-spacing:.1em;color:#69736e;text-transform:uppercase}.rp-price{display:flex;justify-content:space-between;align-items:end;margin:25px 0 22px;border-top:1px solid #dadbd3;padding-top:17px}.rp-price strong{font-size:22px;letter-spacing:-.05em}.rp-price span{font:10px "DM Mono";color:#69736e}.rp-specs{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:auto}.rp-specs div{background:#eeeee8;padding:12px}.rp-specs small{display:block;font:9px "DM Mono";color:#7c8780;margin-bottom:4px}.rp-specs b{font-size:12px}.rp-cta{margin-top:24px;display:flex;gap:9px}.rp-cta button{cursor:pointer;border:0;background:#e04a32;color:#fff;padding:14px 16px;flex:1;font:700 11px Manrope}.rp-cta button.alt{background:transparent;color:#18201e;border:1px solid #bfc2b9;flex:0 0 44px;font-size:16px}.rp-bottom{padding:0 5vw 70px;display:grid;grid-template-columns:1fr 1.6fr;gap:40px}.rp-bottom h3{font-size:20px;letter-spacing:-.05em;margin:0 0 9px}.rp-bottom p{font-size:12px;color:#68706c;line-height:1.6;max-width:380px;margin:0}.rp-filters{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #c9cbc2;padding-bottom:12px;margin-bottom:13px}.rp-filters span{font:10px "DM Mono";color:#77817b}.rp-tabs{display:flex;gap:8px}.rp-tabs button{background:transparent;border:1px solid #c9cbc2;padding:7px 11px;font:10px "DM Mono";cursor:pointer}.rp-tabs button.selected{background:#18201e;color:#f8f7f2;border-color:#18201e}.rp-list{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.rp-list button{border:1px solid transparent;background:#e8e9e2;padding:0;text-align:left;cursor:pointer}.rp-list button.selected{border-color:#e04a32}.rp-list img{display:block;width:100%;height:66px;object-fit:cover}.rp-list b,.rp-list small{display:block;padding:7px 9px 0}.rp-list b{font-size:11px}.rp-list small{padding-top:3px;padding-bottom:10px;font:9px "DM Mono";color:#77817b}.rp-toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#18201e;color:#f8f7f2;padding:12px 18px;font-size:12px}.rp-toast button{margin-left:15px;color:#ff826d;background:none;border:0;cursor:pointer}@media(max-width:800px){.rp-nav{display:none}.rp-intro{display:block;padding-top:32px}.rp-intro p{margin-top:20px}.rp-workspace{grid-template-columns:1fr;margin:0 18px}.rp-map{min-height:300px}.rp-detail{padding:22px}.rp-bottom{padding:0 18px 50px;display:block}.rp-bottom>div:first-child{margin:28px 0}.rp-list{grid-template-columns:repeat(3,1fr)}.rp-top{padding:0 18px}}
      `}</style>
      <header className="rp-top">
        <div className="rp-brand"><i /> MYG / IMPORT</div>
        <nav className="rp-nav"><a href="#route">Le réseau</a><a href="#stock">Le stock</a><a href="#method">Notre méthode</a></nav>
        <button onClick={() => document.getElementById("request")?.scrollIntoView({ behavior: "smooth" })}>Parler à un expert</button>
      </header>
      <main>
        <section className="rp-intro" id="route">
          <div><div className="rp-kicker">Recherche européenne / 01</div><h1>Votre prochain départ se trouve peut-être à 438 km.</h1></div>
          <p>Nous parcourons les stocks européens, vérifions chaque opportunité et organisons son arrivée au Luxembourg. Explorez notre réseau.</p>
        </section>
        <section className="rp-workspace">
          <div className="rp-map" aria-label="Carte des véhicules disponibles">
            <div className="route" />
            <span className="map-label label-nl">PAYS-BAS</span><span className="map-label label-de">ALLEMAGNE</span><span className="map-label label-fr">FRANCE</span>
            {visible.map((vehicle) => <button key={vehicle.id} className={`marker ${active.id === vehicle.id ? "active" : ""}`} style={{ left: vehicle.x, top: vehicle.y }} onClick={() => setActive(vehicle)} aria-label={`Voir ${vehicle.make} ${vehicle.model}`}><span className="marker-pin" /><span>{vehicle.city}</span></button>)}
            <div className="rp-legend"><span><b /> Disponible maintenant</span><span>— itinéraire estimé</span></div>
          </div>
          <aside className="rp-detail">
            <div className="rp-detail-top"><small>OPPORTUNITÉ {String(active.id).padStart(2, "0")} / 03</small><button className={`rp-save ${saved.includes(active.id) ? "on" : ""}`} onClick={() => setSaved((s) => s.includes(active.id) ? s.filter((id) => id !== active.id) : [...s, active.id])} aria-label="Sauvegarder">♡</button></div>
            <div className="rp-image"><img src={`/__mockup/images/eu-home/${active.image}`} alt={`${active.make} ${active.model}`} /></div>
            <span className="rp-city">{active.country} · {active.city} · arrive en 6 jours</span><h2>{active.make}<br />{active.model}</h2>
            <div className="rp-price"><strong>{active.price}</strong><span>hors frais d'import</span></div>
            <div className="rp-specs"><div><small>ANNÉE</small><b>{active.year}</b></div><div><small>KILOMÉTRAGE</small><b>{active.km}</b></div><div><small>BOÎTE</small><b>Automatique</b></div><div><small>ÉNERGIE</small><b>Hybride</b></div></div>
            <div className="rp-cta"><button onClick={() => setSent(true)}>Recevoir le dossier</button><button className="alt" onClick={() => setSaved((s) => s.includes(active.id) ? s : [...s, active.id])}>♡</button></div>
          </aside>
        </section>
        <section className="rp-bottom" id="stock">
          <div id="method"><div className="rp-kicker">Une carte, pas un catalogue</div><h3>Chaque point est une piste vérifiée.</h3><p>Notre sélection change chaque semaine. Cliquez sur un point pour voir le véhicule, son origine et son itinéraire jusqu'à vous.</p></div>
          <div><div className="rp-filters"><span>{visible.length} VÉHICULES SUR LE RÉSEAU</span><div className="rp-tabs">{["Tous", "DE", "NL", "FR"].map((country) => <button className={filter === country ? "selected" : ""} key={country} onClick={() => setFilter(country)}>{country}</button>)}</div></div><div className="rp-list">{visible.map((vehicle) => <button key={vehicle.id} className={active.id === vehicle.id ? "selected" : ""} onClick={() => setActive(vehicle)}><img src={`/__mockup/images/eu-home/${vehicle.image}`} alt="" /><b>{vehicle.make} {vehicle.model}</b><small>{vehicle.city} · {vehicle.price}</small></button>)}</div></div>
        </section>
        <div id="request" />
      </main>
      {sent && <div className="rp-toast">Votre demande est prête à partir. <button onClick={() => setSent(false)}>Fermer</button></div>}
    </div>
  );
}