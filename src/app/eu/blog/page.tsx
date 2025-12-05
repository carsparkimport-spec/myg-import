'use client';

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';
import Link from 'next/link';
import { useState } from 'react';

export default function EuBlogArticlePage() {
  const { t } = useI18n();
  type ArticleId = 'route' | 'immat-lu' | 'immat-neuve-lu' | 'immat-fr' | 'immat-be';
  const [article, setArticle] = useState<ArticleId>('route');

  const articles: Array<{
    id: ArticleId;
    title: string;
    excerpt: string;
    category: 'Transport' | 'Immatriculation';
    readingTime: string;
    updated: string;
    cover: string;
  }> = [
    {
      id: 'route',
      title: 'Ramener la voiture par la route : une fausse bonne idée ?',
      excerpt:
        'Plaques temporaires, assurances, risques sur la route… Le plateau est souvent plus sûr et pas forcément plus cher.',
      category: 'Transport',
      readingTime: '5 min',
      updated: 'Déc. 2025',
      cover: '/images/backgrounds/transporteur camion.png',
    },
    {
      id: 'immat-lu',
      title: 'Immatriculer un véhicule importé au Luxembourg : les étapes essentielles',
      excerpt:
        'Documents à réunir, conformité, délais, pourquoi se faire accompagner : le déroulé clair de l’immatriculation.',
      category: 'Immatriculation',
      readingTime: '7 min',
      updated: 'Déc. 2025',
      cover: '/images/backgrounds/LUX LUX.jpg',
    },
    {
      id: 'immat-neuve-lu',
      title: 'Immatriculer une voiture neuve au Luxembourg : les étapes clés',
      excerpt:
        'TVA (vignette 705), COC, assurance, SNCA — les démarches essentielles pour un véhicule neuf intra‑UE.',
      category: 'Immatriculation',
      readingTime: '6 min',
      updated: 'Déc. 2025',
      cover: '/images/backgrounds/certif immat.jpg',
    },
    {
      id: 'immat-fr',
      title: 'Immatriculer en France une voiture achetée au Luxembourg',
      excerpt:
        'Quitus fiscal, dossier ANTS, plaques WW, pièces à fournir — tout ce qu’il faut savoir.',
      category: 'Immatriculation',
      readingTime: '6 min',
      updated: 'Déc. 2025',
      cover: '/images/backgrounds/Luxembourg France.png',
    },
    {
      id: 'immat-be',
      title: 'Immatriculer en Belgique une voiture achetée au Luxembourg',
      excerpt:
        'Assureur (formulaire DIV), contrôle technique, dossier, réception de la plaque et certificat.',
      category: 'Immatriculation',
      readingTime: '6 min',
      updated: 'Déc. 2025',
      cover: '/images/backgrounds/Luxembourg Belgique.jpg',
    },
  ];

  const selected = articles.find((a) => a.id === article)!;
  return (
    <Layout title={t('blog.title')}>
      <div className="container mx-auto px-4 py-10">
        <nav className="text-sm text-gray-600 mb-2">
          <Link href="/eu" className="underline underline-offset-2 decoration-gray-300 hover:decoration-gray-700">EU</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Blog</span>
        </nav>
        <div className="rounded-2xl bg-gradient-to-r from-white to-gray-50 ring-1 ring-gray-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-deep-black tracking-tight">Blog</h1>
              <p className="text-gray-700 mt-1">Conseils pratiques pour transporter, immatriculer et acheter en toute sérénité.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Transport', 'Immatriculation'].map((cat) => {
                const isActive = selected.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      const firstInCat = articles.find((a) => a.category === cat)!;
                      setArticle(firstInCat.id);
                    }}
                    className={`text-xs px-3 py-1 rounded-full ring-1 ${
                      isActive ? 'bg-red-600 text-white ring-red-600' : 'bg-white text-gray-800 ring-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-4 space-y-3">
              {articles.map((a) => {
                const active = a.id === article;
                return (
                  <button
                    key={a.id}
                    onClick={() => setArticle(a.id)}
                    className={`w-full text-left rounded-xl p-4 ring-1 transition ${
                      active
                        ? 'bg-red-600 text-white ring-red-600'
                        : 'bg-white text-gray-900 ring-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="mb-3 overflow-hidden rounded-lg ring-1 ring-black/5">
                      <img
                        src={a.cover}
                        alt=""
                        className={`w-full h-28 object-cover ${active ? 'opacity-95' : 'opacity-100'}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="text-[11px] uppercase tracking-wide opacity-80">{a.category}</div>
                    <div className="font-semibold mt-1">{a.title}</div>
                    <div className={`text-sm mt-1 ${active ? 'text-white/90' : 'text-gray-600'}`}>{a.excerpt}</div>
                    <div className={`mt-2 text-xs ${active ? 'text-white/80' : 'text-gray-500'}`}>
                      {a.readingTime} · {a.updated}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
          <section className="md:col-span-8 lg:col-span-9">
            {article === 'route' && (
              <div className="mb-4 rounded-lg bg-white ring-1 ring-gray-200 p-4 text-sm text-gray-700">
                <div className="font-semibold mb-2">Sommaire</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><a href="#route-plateau" className="underline decoration-gray-300 hover:decoration-gray-700">Transport sur plateau</a></li>
                  <li><a href="#route-cout" className="underline decoration-gray-300 hover:decoration-gray-700">Coût: route vs plateau</a></li>
                  <li><a href="#route-cas" className="underline decoration-gray-300 hover:decoration-gray-700">Quand le plateau s’impose</a></li>
                  <li><a href="#route-process" className="underline decoration-gray-300 hover:decoration-gray-700">Notre organisation</a></li>
                  <li><a href="#route-resume" className="underline decoration-gray-300 hover:decoration-gray-700">En résumé</a></li>
                </ol>
              </div>
            )}
            {article === 'immat-lu' && (
              <div className="mb-4 rounded-lg bg-white ring-1 ring-gray-200 p-4 text-sm text-gray-700">
                <div className="font-semibold mb-2">Sommaire</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><a href="#immat-1" className="underline decoration-gray-300 hover:decoration-gray-700">Vérifier l’immatriculabilité</a></li>
                  <li><a href="#immat-2" className="underline decoration-gray-300 hover:decoration-gray-700">Documents nécessaires</a></li>
                  <li><a href="#immat-3" className="underline decoration-gray-300 hover:decoration-gray-700">Neuf vs occasion</a></li>
                  <li><a href="#immat-4" className="underline decoration-gray-300 hover:decoration-gray-700">Ce que MYG prend en charge</a></li>
                  <li><a href="#immat-5" className="underline decoration-gray-300 hover:decoration-gray-700">Contrôle technique & conformité</a></li>
                  <li><a href="#immat-6" className="underline decoration-gray-300 hover:decoration-gray-700">Délais</a></li>
                  <li><a href="#immat-7" className="underline decoration-gray-300 hover:decoration-gray-700">Pourquoi se faire accompagner</a></li>
                  <li><a href="#immat-resume" className="underline decoration-gray-300 hover:decoration-gray-700">En résumé</a></li>
                </ol>
              </div>
            )}
            {article === 'immat-neuve-lu' && (
              <div className="mb-4 rounded-lg bg-white ring-1 ring-gray-200 p-4 text-sm text-gray-700">
                <div className="font-semibold mb-2">Sommaire</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><a href="#neuve-1" className="underline decoration-gray-300 hover:decoration-gray-700">Conformité (COC / cas particuliers)</a></li>
                  <li><a href="#neuve-2" className="underline decoration-gray-300 hover:decoration-gray-700">TVA Luxembourg & vignette 705</a></li>
                  <li><a href="#neuve-3" className="underline decoration-gray-300 hover:decoration-gray-700">Assurance & numéro d’immatriculation</a></li>
                  <li><a href="#neuve-4" className="underline decoration-gray-300 hover:decoration-gray-700">Demande à la SNCA</a></li>
                  <li><a href="#neuve-5" className="underline decoration-gray-300 hover:decoration-gray-700">Comment MYG vous aide</a></li>
                  <li><a href="#neuve-note" className="underline decoration-gray-300 hover:decoration-gray-700">Note importante</a></li>
                </ol>
              </div>
            )}
            {article === 'immat-fr' && (
              <div className="mb-4 rounded-lg bg-white ring-1 ring-gray-200 p-4 text-sm text-gray-700">
                <div className="font-semibold mb-2">Sommaire</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><a href="#fr-1" className="underline decoration-gray-300 hover:decoration-gray-700">Documents à récupérer</a></li>
                  <li><a href="#fr-2" className="underline decoration-gray-300 hover:decoration-gray-700">Quitus fiscal</a></li>
                  <li><a href="#fr-3" className="underline decoration-gray-300 hover:decoration-gray-700">Dossier carte grise</a></li>
                  <li><a href="#fr-4" className="underline decoration-gray-300 hover:decoration-gray-700">Plaques provisoires WW</a></li>
                  <li><a href="#fr-5" className="underline decoration-gray-300 hover:decoration-gray-700">Rôle de MYG Import</a></li>
                  <li><a href="#fr-note" className="underline decoration-gray-300 hover:decoration-gray-700">Note importante</a></li>
                </ol>
              </div>
            )}
            {article === 'immat-be' && (
              <div className="mb-4 rounded-lg bg-white ring-1 ring-gray-200 p-4 text-sm text-gray-700">
                <div className="font-semibold mb-2">Sommaire</div>
                <ol className="list-decimal pl-5 space-y-1">
                  <li><a href="#be-1" className="underline decoration-gray-300 hover:decoration-gray-700">Documents à rassembler</a></li>
                  <li><a href="#be-2" className="underline decoration-gray-300 hover:decoration-gray-700">Passage par l’assurance (DIV)</a></li>
                  <li><a href="#be-3" className="underline decoration-gray-300 hover:decoration-gray-700">Contrôle technique (si requis)</a></li>
                  <li><a href="#be-4" className="underline decoration-gray-300 hover:decoration-gray-700">Dossier à la DIV</a></li>
                  <li><a href="#be-5" className="underline decoration-gray-300 hover:decoration-gray-700">Réception de la plaque</a></li>
                  <li><a href="#be-6" className="underline decoration-gray-300 hover:decoration-gray-700">Rôle de MYG Import</a></li>
                  <li><a href="#be-note" className="underline decoration-gray-300 hover:decoration-gray-700">Note importante</a></li>
                </ol>
              </div>
            )}
            {article === 'route' && (
            <div className="prose prose-neutral max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ramener la voiture par la route : une fausse bonne idée ?</h2>
          <p>
            Sur le papier, venir chercher sa voiture et la ramener soi‑même peut sembler plus économique. En réalité, c’est souvent plus
            compliqué, plus risqué… et pas forcément moins cher.
          </p>

          <p className="mt-4">Pour ramener un véhicule par la route, il faut généralement :</p>
          <ul>
            <li>des plaques temporaires (du pays d’origine ou de destination),</li>
            <li>une assurance valable pour ce trajet,</li>
            <li>se déplacer jusqu’au vendeur (train, avion, hôtel parfois),</li>
            <li>prévoir le carburant, les péages, le temps de route, les imprévus.</li>
          </ul>

          <p className="mt-4">À cela s’ajoutent les risques :</p>
          <ul>
            <li>panne ou incident sur le trajet,</li>
            <li>accrochage ou accident avec un véhicule que tu ne connais pas encore,</li>
            <li>kilomètres supplémentaires dès le premier jour,</li>
            <li>éventuels PV ou contrôles si un document manque ou n’est pas clair.</li>
          </ul>

          <p className="mt-4">
            Au final, ce qui ressemble à une “bonne affaire” peut vite devenir un trajet stressant, long, et parfois coûteux.
          </p>

          <hr className="my-8" />

          <h2 id="route-plateau" className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-8 mb-4">Le transport sur camion plateau : plus pro, plus sûr</h2>
          <p>
            Le transport sur camion plateau consiste à charger le véhicule sur un camion spécialisé, depuis son point de départ jusqu’à son
            point d’arrivée (souvent notre point de livraison ou le Luxembourg).
          </p>
          <p className="mt-4 font-semibold">Concrètement, ça change quoi ?</p>

          <h3 className="text-xl font-semibold mt-6 mb-2">1. Le véhicule est protégé</h3>
          <ul>
            <li>Aucun kilomètre supplémentaire au compteur.</li>
            <li>Pas de risque de surchauffe, de panne ou de casse sur la route.</li>
            <li>Pas besoin de plaques temporaires ni d’assurance provisoire pour le trajet.</li>
          </ul>
          <p className="mt-2">Le véhicule voyage en mode “marchandise transportée”, pas en “véhicule en circulation”.</p>

          <h3 className="text-xl font-semibold mt-6 mb-2">2. Tout est tracé et encadré</h3>
          <p>
            Nous travaillons avec des transporteurs habitués aux véhicules importés. Le transport est planifié, encadré, et assuré dans un
            cadre professionnel.
          </p>
          <ul>
            <li>Enlèvement chez le vendeur (ou au dépôt / centre logistique),</li>
            <li>Livraison au Luxembourg (ou dans un autre point convenu),</li>
            <li>Délais annoncés et raisonnables.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">3. Le client évite la galère logistique</h3>
          <p>Pas besoin de :</p>
          <ul>
            <li>prendre plusieurs jours off,</li>
            <li>gérer un aller‑retour à l’étranger,</li>
            <li>jongler avec les administrations pour obtenir des plaques temporaires.</li>
          </ul>
          <p className="mt-2">
            Tu récupères simplement ton véhicule chez MYG Import, une fois qu’il est arrivé, contrôlé et prêt.
          </p>

          <hr className="my-8" />

          <h2 id="route-cout" className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-8 mb-4">Et le coût dans tout ça ?</h2>
          <p>
            Un transport sur camion plateau représente bien sûr un coût. À titre indicatif, sur certaines liaisons courantes (par exemple
            entre un port ou un hub comme Zeebrugge et Luxembourg‑Ville), on est souvent autour de 600 € HT, avec des variations selon :
          </p>
          <ul>
            <li>la distance,</li>
            <li>le transporteur,</li>
            <li>le délai souhaité,</li>
            <li>le type de véhicule.</li>
          </ul>
          <p className="mt-4">Mais il faut le comparer avec le coût réel d’un rapatriement par la route :</p>
          <ul>
            <li>déplacements (train/avion) pour aller chercher la voiture,</li>
            <li>hébergement éventuel,</li>
            <li>plaques et assurances temporaires,</li>
            <li>carburant, péages,</li>
            <li>temps perdu…</li>
            <li>sans parler du risque d’un souci mécanique ou d’un incident sur le trajet.</li>
          </ul>
          <p className="mt-2">
            Dans bien des cas, le plateau est à peine plus cher – voire similaire – mais nettement plus sécurisant.
          </p>

          <hr className="my-8" />

          <h2 id="route-cas" className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-8 mb-4">Dans quels cas le plateau est presque indispensable ?</h2>
          <p>Même si on pourrait théoriquement tout ramener par la route, il y a des situations où le plateau est pour nous quasi obligatoire :</p>
          <ul>
            <li>véhicules sportifs ou puissants (où un incident mécanique coûterait très cher),</li>
            <li>véhicules anciens, de collection ou avec une valeur sentimentale importante,</li>
            <li>véhicules faiblement kilométrés où l’on veut éviter d’ajouter 800–1 000 km dès le départ,</li>
            <li>cas où les documents provisoires sont compliqués à obtenir ou pas suffisamment clairs.</li>
          </ul>
          <p className="mt-2">
            Dans ces cas, le plateau n’est pas seulement un confort : c’est une vraie mesure de protection pour le client et pour le véhicule.
          </p>

          <hr className="my-8" />

          <h2 id="route-process" className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-8 mb-4">Comment MYG Import gère le transport de votre véhicule</h2>
          <p>Chez MYG Import, le transport fait partie intégrante du service :</p>
          <ol className="list-decimal pl-6">
            <li>Nous organisons le transport avec nos partenaires habituels (camion plateau).</li>
            <li>Le véhicule est enlevé chez le vendeur ou sur le site logistique.</li>
            <li>Il est acheminé jusqu’à notre point de livraison (parking couvert / lieu convenu).</li>
            <li>Nous contrôlons le véhicule à l’arrivée (état extérieur, documents, cohérence avec ce qui a été vendu).</li>
            <li>Nous planifions avec vous la remise des clés une fois tout en ordre.</li>
          </ol>
          <p className="mt-2">
            Le client n’a pas à gérer cette partie : tout est intégré et expliqué dès le devis, sans surprise.
          </p>

          <hr className="my-8" />

          <h2 id="route-resume" className="scroll-mt-24 text-2xl md:text-3xl font-bold mt-8 mb-4">En résumé</h2>
          <p>Ramener une voiture importée par la route peut sembler séduisant sur le papier, mais :</p>
          <ul>
            <li>c’est plus complexe,</li>
            <li>plus risqué,</li>
            <li>et souvent pas beaucoup moins cher que de passer par un transport pro sur plateau.</li>
          </ul>
          <p className="mt-2">C’est pour cela que chez MYG Import, nous privilégions cette solution :</p>
          <ul>
            <li>👉 pour protéger le véhicule,</li>
            <li>👉 sécuriser le process,</li>
            <li>👉 et offrir à nos clients une expérience d’import simple et sereine, du premier contact à la remise des clés.</li>
          </ul>
            </div>
            )}

            {article === 'immat-lu' && (
              <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Immatriculer un véhicule importé au Luxembourg : les étapes essentielles</h2>
            <p>
              Vous avez trouvé un véhicule intéressant en Europe et vous souhaitez l’immatriculer au Luxembourg ? Bonne nouvelle :
              pour un véhicule intra‑UE, la procédure est claire… à condition d’avoir les bons documents et un véhicule conforme.
            </p>
            <p>Voici les grandes étapes, telles que nous les gérons chez MYG Import.</p>

            <hr className="my-8" />

            <h3 id="immat-1" className="scroll-mt-24 text-xl md:text-2xl font-bold">1. Vérifier que le véhicule est immatriculable</h3>
            <p>Avant d’acheter, il est essentiel de vérifier que le véhicule pourra être immatriculé au Luxembourg :</p>
            <ul>
              <li>véhicule provenant d’un pays de l’Union européenne,</li>
              <li>véhicule conforme aux normes européennes (type CE / certificat de conformité),</li>
              <li>historique et kilométrage cohérents,</li>
              <li>absence de blocage administratif dans le pays d’origine.</li>
            </ul>
            <p>🛠 Chez MYG Import, cette vérification est faite avant l’achat. Nous ne proposons pas un véhicule qui risquerait d’être compliqué, voire impossible, à immatriculer.</p>

            <hr className="my-8" />

            <h3 id="immat-2" className="scroll-mt-24 text-xl md:text-2xl font-bold">2. Les documents nécessaires</h3>
            <p>Pour l’immatriculation, plusieurs documents sont indispensables. Nous vous aidons à les réunir et à les vérifier :</p>
            <ul>
              <li>
                <strong>Contrat de vente ou facture</strong><br />
                Établi par MYG Import (CAR SPARK IMPORT S.à r.l.), avec les mentions obligatoires : modèle, VIN, kilométrage, prix TTC, identité de l’acheteur, etc.
              </li>
              <li>
                <strong>Certificat d’immatriculation étranger</strong><br />
                La carte grise du pays d’origine, au nom du précédent propriétaire, avec les mentions ou documents prouvant la cession.
              </li>
              <li>
                <strong>Certificat de conformité (COC)</strong><br />
                Il atteste que le véhicule est conforme à un type européen homologué. S’il n’est pas disponible, nous étudions la possibilité de le commander ou de proposer une alternative.
              </li>
              <li>
                <strong>Contrôle technique</strong><br />
                Selon l’âge du véhicule, un contrôle technique valide peut être exigé avant l’immatriculation.
              </li>
              <li>
                <strong>Justificatifs de l’acheteur</strong><br />
                Pièce d’identité, preuve d’adresse au Luxembourg, et, le cas échéant, d’autres documents administratifs.
              </li>
            </ul>
            <p>Notre rôle : vous dire clairement ce que vous avez déjà et ce qu’il manque encore, avant de lancer les démarches.</p>

            <hr className="my-8" />

            <h3 id="immat-3" className="scroll-mt-24 text-xl md:text-2xl font-bold">3. Véhicule neuf ou d’occasion : quelle différence ?</h3>
            <p>La distinction entre véhicule neuf et d’occasion a un impact sur le traitement administratif et fiscal.</p>
            <p>
              En pratique, nous travaillons avec des véhicules d’occasion, ce qui simplifie une partie des démarches pour nos clients tout en restant parfaitement encadré.
            </p>
            <p>Concrètement, MYG Import :</p>
            <ul>
              <li>sélectionne des véhicules d’occasion adaptés à vos besoins,</li>
              <li>vérifie leur conformité,</li>
              <li>vous les revend via un contrat de vente clair, avec un prix TTC connu à l’avance.</li>
            </ul>

            <hr className="my-8" />

            <h3 id="immat-4" className="scroll-mt-24 text-xl md:text-2xl font-bold">4. Ce que MYG Import prend en charge</h3>
            <p>Notre objectif est de vous éviter les démarches complexes et les mauvaises surprises.</p>
            <p>MYG Import s’occupe de :</p>
            <ul>
              <li>rechercher et acheter le véhicule en Europe,</li>
              <li>contrôler les documents étrangers,</li>
              <li>organiser le transport (camion plateau) jusqu’au Luxembourg,</li>
              <li>établir un contrat de vente précis entre notre société et vous,</li>
              <li>vous accompagner dans la constitution du dossier d’immatriculation.</li>
            </ul>
            <p>De votre côté, il vous reste à :</p>
            <ul>
              <li>signer le contrat de vente,</li>
              <li>régler le prix convenu par virement bancaire,</li>
              <li>fournir vos justificatifs personnels (identité, adresse, etc.),</li>
              <li>déposer le dossier auprès de l’administration compétente, si vous souhaitez réaliser la démarche vous‑même.</li>
            </ul>
            <p>Selon la formule choisie, nous pouvons vous assister ou prendre en charge une partie des démarches.</p>

            <hr className="my-8" />

            <h3 id="immat-5" className="scroll-mt-24 text-xl md:text-2xl font-bold">5. Contrôle technique et conformité</h3>
            <p>Pour certains véhicules, un contrôle technique local ou une vérification complémentaire peut être nécessaire avant l’immatriculation.</p>
            <p>Nous privilégions autant que possible des véhicules :</p>
            <ul>
              <li>déjà conformes aux standards européens,</li>
              <li>avec des documents clairs,</li>
              <li>sans particularités techniques compliquées.</li>
            </ul>
            <p>Cela permet de réduire les délais et de limiter les démarches supplémentaires (réception, régularisation, etc.).</p>

            <hr className="my-8" />

            <h3 id="immat-6" className="scroll-mt-24 text-xl md:text-2xl font-bold">6. Délais : à quoi s’attendre ?</h3>
            <p>Les délais d’immatriculation dépendent principalement de :</p>
            <ul>
              <li>la complétude du dossier,</li>
              <li>la nécessité ou non d’un contrôle technique,</li>
              <li>la période et la charge des services administratifs.</li>
            </ul>
            <p>
              Notre travail consiste à anticiper ces points : avant même l’arrivée du véhicule, nous vérifions les documents et attirons votre
              attention sur les points à régler. L’objectif : que votre voiture soit immatriculée le plus rapidement possible une fois sur place.
            </p>

            <hr className="my-8" />

            <h3 id="immat-7" className="scroll-mt-24 text-xl md:text-2xl font-bold">7. Pourquoi se faire accompagner ?</h3>
            <p>Un dossier incomplet ou mal préparé peut entraîner :</p>
            <ul>
              <li>des allers‑retours avec l’administration,</li>
              <li>des délais rallongés,</li>
              <li>des frais supplémentaires (documents manquants, démarches à refaire, etc.),</li>
              <li>un véhicule immobilisé en attendant que tout soit en ordre.</li>
            </ul>
            <p>En passant par MYG Import, vous bénéficiez :</p>
            <ul>
              <li>d’une sélection de véhicules pensés pour être immatriculés sans mauvaise surprise,</li>
              <li>d’un contrat de vente transparent,</li>
              <li>d’un accompagnement structuré jusqu’à la mise en circulation.</li>
            </ul>

            <hr className="my-8" />

            <h3 id="immat-resume" className="scroll-mt-24 text-xl md:text-2xl font-bold">En résumé</h3>
            <p>Immatriculer un véhicule importé au Luxembourg est tout à fait faisable, à condition de :</p>
            <ul>
              <li>choisir un véhicule conforme,</li>
              <li>disposer des bons documents,</li>
              <li>suivre les étapes dans le bon ordre.</li>
            </ul>
            <p>
              MYG Import vous accompagne sur l’ensemble du processus : de la recherche en Europe à la préparation du dossier d’immatriculation,
              jusqu’à la remise des clés de votre nouveau véhicule, prêt à rouler.
            </p>
              </div>
            )}
            {article === 'immat-neuve-lu' && (
              <div className="prose prose-neutral max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Immatriculer une voiture neuve au Luxembourg : les étapes clés</h2>
                <p>
                  Vous avez acheté une voiture neuve dans un autre pays de l’Union européenne et vous souhaitez l’immatriculer au Luxembourg ?
                  Voici les grandes étapes à connaître pour que tout se passe sereinement.
                </p>

                <hr className="my-8" />

                <h3 id="neuve-1" className="scroll-mt-24 text-xl md:text-2xl font-bold">1. Vérifier la conformité du véhicule</h3>
                <p>Avant toute démarche, il faut s’assurer que le véhicule est conforme aux normes européennes.</p>
                <p>Concrètement, cela passe le plus souvent par :</p>
                <ul>
                  <li>un certificat de conformité européen (COC),</li>
                  <li>ou, plus rarement, une démarche spécifique de conformité si le véhicule a une configuration particulière.</li>
                </ul>
                <p>
                  Chez MYG Import, nous privilégions des véhicules déjà clairement homologués en Europe, afin d’éviter des démarches
                  supplémentaires lourdes et coûteuses.
                </p>

                <hr className="my-8" />

                <h3 id="neuve-2" className="scroll-mt-24 text-xl md:text-2xl font-bold">2. Régler la TVA et obtenir la vignette 705</h3>
                <p>Pour un véhicule neuf acheté dans un autre État membre de l’UE, la TVA doit être payée au Luxembourg.</p>
                <p>En pratique :</p>
                <ol className="list-decimal pl-6">
                  <li>Vous vous présentez auprès de l’Administration des douanes et accises avec :</li>
                </ol>
                <ul>
                  <li>la facture d’achat du véhicule,</li>
                  <li>le certificat de conformité (COC),</li>
                  <li>les documents du véhicule (certificat d’immatriculation provisoire, le cas échéant).</li>
                </ul>
                <ol start={2} className="list-decimal pl-6">
                  <li>Vous remplissez la déclaration appropriée pour un véhicule neuf (type 446L).</li>
                </ol>
                <ol start={3} className="list-decimal pl-6">
                  <li>Vous réglez la TVA luxembourgeoise calculée sur le prix du véhicule.</li>
                </ol>
                <p>En contrepartie, l’administration vous remet une vignette 705, document indispensable pour demander l’immatriculation.</p>

                <hr className="my-8" />

                <h3 id="neuve-3" className="scroll-mt-24 text-xl md:text-2xl font-bold">3. Assurer le véhicule et choisir un numéro de plaque</h3>
                <p>Avant d’immatriculer définitivement, il faut :</p>
                <ul>
                  <li>choisir ou réserver un numéro d’immatriculation luxembourgeois,</li>
                  <li>souscrire une assurance luxembourgeoise,</li>
                  <li>récupérer votre attestation d’assurance / carte verte.</li>
                </ul>
                <p>Cette attestation sera à joindre au dossier d’immatriculation.</p>

                <hr className="my-8" />

                <h3 id="neuve-4" className="scroll-mt-24 text-xl md:text-2xl font-bold">4. Demander l’immatriculation auprès de la SNCA</h3>
                <p>L’immatriculation se fait auprès de la SNCA (Société Nationale de Circulation Automobile).</p>
                <p>Les documents usuels à fournir sont notamment :</p>
                <ul>
                  <li>le formulaire de demande d’immatriculation, complété et signé,</li>
                  <li>la vignette 705 remise par les douanes,</li>
                  <li>le certificat de conformité (COC),</li>
                  <li>la facture / contrat de vente,</li>
                  <li>l’attestation d’assurance,</li>
                  <li>votre pièce d’identité et, le cas échéant, votre numéro d’identification national,</li>
                  <li>les timbres de chancellerie correspondant aux droits d’immatriculation.</li>
                </ul>
                <p>
                  Une fois le dossier accepté, le certificat d’immatriculation est émis et vous pouvez faire fabriquer vos plaques
                  luxembourgeoises définitives.
                </p>

                <hr className="my-8" />

                <h3 id="neuve-5" className="scroll-mt-24 text-xl md:text-2xl font-bold">5. Comment MYG Import peut vous aider</h3>
                <p>En tant que professionnel de l’import, MYG Import peut :</p>
                <ul>
                  <li>vérifier la conformité du véhicule en amont,</li>
                  <li>s’assurer que les documents nécessaires sont disponibles,</li>
                  <li>vous guider pour la partie TVA (vignette 705),</li>
                  <li>vous accompagner dans la préparation du dossier SNCA,</li>
                  <li>organiser la livraison de votre véhicule prêt à être immatriculé.</li>
                </ul>
                <p>
                  L’objectif : que l’achat de votre voiture neuve en Europe reste un plaisir, pas un parcours administratif.
                </p>

                <hr className="my-8" />

                <h3 id="neuve-note" className="scroll-mt-24 text-xl md:text-2xl font-bold">Note importante</h3>
                <p className="text-sm">
                  Les informations ci‑dessus sont fournies à titre indicatif et ne remplacent pas les informations des administrations
                  compétentes au Luxembourg (SNCA, Administration des douanes et accises, etc.). La réglementation pouvant évoluer, vérifiez
                  votre situation au moment des démarches ou rapprochez‑vous des services officiels.
                </p>
              </div>
            )}
            {article === 'immat-fr' && (
              <div className="prose prose-neutral max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Immatriculer en France une voiture achetée au Luxembourg</h2>
                <p>
                  Vous achetez un véhicule au Luxembourg (par exemple via MYG Import) et vous souhaitez l’immatriculer en France ?
                  Voici les grandes lignes de la procédure pour un véhicule en provenance de l’Union européenne.
                </p>

                <hr className="my-8" />

                <h3 id="fr-1" className="scroll-mt-24 text-xl md:text-2xl font-bold">1. Récupérer tous les documents auprès du vendeur luxembourgeois</h3>
                <p>Au moment de la vente, assurez‑vous de repartir avec un dossier complet. Vous devez notamment disposer de :</p>
                <ul>
                  <li>la facture ou le contrat de vente (identité du vendeur/acheteur, description du véhicule, prix TTC),</li>
                  <li>la carte grise luxembourgeoise (volets appropriés en cas de cession),</li>
                  <li>le certificat de conformité (COC) ou sa disponibilité,</li>
                  <li>un contrôle technique valide si le véhicule y est soumis (idéalement &lt; 6 mois).</li>
                </ul>
                <p>MYG Import remet ces documents à ses clients lors de la livraison du véhicule.</p>

                <hr className="my-8" />

                <h3 id="fr-2" className="scroll-mt-24 text-xl md:text-2xl font-bold">2. Obtenir le quitus fiscal en France</h3>
                <p>
                  Avant de pouvoir demander la carte grise française, vous devez obtenir un quitus fiscal auprès de votre service des impôts.
                </p>
                <p>Vous présenterez généralement :</p>
                <ul>
                  <li>la facture / contrat de vente luxembourgeois,</li>
                  <li>la carte grise luxembourgeoise,</li>
                  <li>votre pièce d’identité,</li>
                  <li>un justificatif de domicile en France.</li>
                </ul>
                <p>
                  Pour un véhicule neuf au sens fiscal (moins de 6 mois ou moins de 6 000 km), la TVA française est due en France.
                  Pour un véhicule d’occasion, le quitus fiscal atteste que la TVA est en règle (sans paiement supplémentaire dans la plupart des cas).
                </p>

                <hr className="my-8" />

                <h3 id="fr-3" className="scroll-mt-24 text-xl md:text-2xl font-bold">3. Constituer votre dossier de carte grise française</h3>
                <p>La demande se fait via le site ANTS ou par un professionnel habilité (garage / service carte grise).</p>
                <p>Pièces généralement demandées :</p>
                <ul>
                  <li>formulaire de demande de certificat d’immatriculation (Cerfa adapté),</li>
                  <li>quitus fiscal,</li>
                  <li>certificat de conformité (COC) ou PV de réception individuelle, si nécessaire,</li>
                  <li>carte grise luxembourgeoise,</li>
                  <li>contrat de vente / facture,</li>
                  <li>contrôle technique &lt; 6 mois (si soumis au CT),</li>
                  <li>pièce d’identité, justificatif de domicile,</li>
                  <li>preuve d’assurance et copie du permis.</li>
                </ul>

                <hr className="my-8" />

                <h3 id="fr-4" className="scroll-mt-24 text-xl md:text-2xl font-bold">4. Plaques provisoires, plaques WW et carte grise définitive</h3>
                <p>
                  Selon votre situation, une immatriculation provisoire peut être nécessaire. Les plaques WW (CPI/WW) permettent de circuler
                  en attendant la carte grise définitive.
                </p>
                <p>En pratique :</p>
                <ul>
                  <li>votre prestataire ou l’ANTS indiquera si un WW est possible / nécessaire,</li>
                  <li>conditions et durée dépendent du type de véhicule et du dossier.</li>
                </ul>
                <p>Une fois la demande complète validée :</p>
                <ol className="list-decimal pl-6">
                  <li>vous recevez un certificat provisoire d’immatriculation (CPI),</li>
                  <li>puis la carte grise définitive par courrier,</li>
                  <li>vous pouvez faire poser vos plaques françaises définitives.</li>
                </ol>

                <hr className="my-8" />

                <h3 id="fr-5" className="scroll-mt-24 text-xl md:text-2xl font-bold">5. Le rôle de MYG Import</h3>
                <p>MYG Import :</p>
                <ul>
                  <li>vous fournit un dossier clair et complet (facture, carte grise luxembourgeoise, COC, CT si disponible),</li>
                  <li>vous explique les étapes (quitus fiscal, ANTS),</li>
                  <li>peut vous orienter vers un professionnel si vous ne souhaitez pas gérer seul(e).</li>
                </ul>
                <p>
                  Notre engagement : vous livrer un véhicule prêt à être immatriculé, avec tous les documents nécessaires, pour des démarches
                  en France simples et rapides.
                </p>

                <hr className="my-8" />

                <h3 id="fr-note" className="scroll-mt-24 text-xl md:text-2xl font-bold">Note importante</h3>
                <p className="text-sm">
                  Les informations ci‑dessus sont fournies à titre indicatif et ne remplacent pas les informations des administrations
                  compétentes en France (services fiscaux, ANTS, etc.). La réglementation pouvant évoluer, vérifiez votre situation au moment
                  des démarches ou rapprochez‑vous des services officiels.
                </p>
              </div>
            )}
            {article === 'immat-be' && (
              <div className="prose prose-neutral max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Immatriculer en Belgique une voiture achetée au Luxembourg</h2>
                <p>
                  Vous avez acheté un véhicule au Luxembourg et vous souhaitez l’immatriculer en Belgique ? Voici les principales étapes à
                  connaître pour un véhicule en provenance d’un autre pays de l’UE.
                </p>

                <hr className="my-8" />

                <h3 id="be-1" className="scroll-mt-24 text-xl md:text-2xl font-bold">1. Rassembler les documents fournis au Luxembourg</h3>
                <p>Avant de ramener la voiture en Belgique, assurez‑vous d’avoir :</p>
                <ul>
                  <li>la carte grise luxembourgeoise (volets appropriés),</li>
                  <li>le certificat de conformité européen (COC),</li>
                  <li>la facture / contrat de vente (vendeur, acheteur, véhicule, prix),</li>
                  <li>le rapport de contrôle technique si disponible et applicable.</li>
                </ul>
                <p>Lorsque le véhicule est vendu en vue d’une immatriculation en Belgique, MYG Import remet ces documents à l’acheteur.</p>

                <hr className="my-8" />

                <h3 id="be-2" className="scroll-mt-24 text-xl md:text-2xl font-bold">2. Passer par votre assurance belge</h3>
                <p>La demande d’immatriculation passe souvent par votre compagnie d’assurance :</p>
                <ol className="list-decimal pl-6">
                  <li>vous contactez votre assureur pour assurer le véhicule,</li>
                  <li>l’assureur complète le formulaire de demande d’immatriculation (formulaire DIV) et y appose une vignette d’assurance,</li>
                  <li>le dossier est transmis à la DIV (par l’assureur ou par vous, selon la procédure).</li>
                </ol>

                <hr className="my-8" />

                <h3 id="be-3" className="scroll-mt-24 text-xl md:text-2xl font-bold">3. Contrôle technique (si requis)</h3>
                <p>
                  Pour certains véhicules importés, un passage au contrôle technique belge peut être requis (véhicules d’occasion, absence de
                  CT récent reconnu, exigence de la DIV…).
                </p>
                <p>Un document spécifique peut alors être établi pour finaliser l’immatriculation.</p>

                <hr className="my-8" />

                <h3 id="be-4" className="scroll-mt-24 text-xl md:text-2xl font-bold">4. Déposer le dossier à la DIV</h3>
                <p>Le dossier comprend généralement :</p>
                <ul>
                  <li>le formulaire de demande portant la vignette de l’assureur,</li>
                  <li>la carte grise luxembourgeoise,</li>
                  <li>le certificat de conformité (COC),</li>
                  <li>la facture / contrat de vente,</li>
                  <li>le rapport de contrôle technique, si applicable,</li>
                  <li>et, selon les cas, une copie de votre pièce d’identité.</li>
                </ul>
                <p>Le dossier est ensuite introduit auprès de la DIV (guichet, poste ou voie électronique selon l’option).</p>

                <hr className="my-8" />

                <h3 id="be-5" className="scroll-mt-24 text-xl md:text-2xl font-bold">5. Réception de la plaque et du certificat</h3>
                <p>Après validation par la DIV :</p>
                <ul>
                  <li>votre plaque d’immatriculation belge, et/ou</li>
                  <li>votre certificat d’immatriculation</li>
                </ul>
                <p>sont envoyés par la poste. Vous pouvez alors faire poser les plaques sur le véhicule.</p>

                <hr className="my-8" />

                <h3 id="be-6" className="scroll-mt-24 text-xl md:text-2xl font-bold">6. Le rôle de MYG Import</h3>
                <p>MYG Import peut :</p>
                <ul>
                  <li>préparer un dossier complet côté vendeur (Luxembourg),</li>
                  <li>vérifier avec vous la présence de tous les documents nécessaires,</li>
                  <li>organiser la livraison du véhicule compatible avec vos démarches d’assurance et d’immatriculation.</li>
                </ul>
                <p>Le but : lancer vos démarches en Belgique sans documents manquants.</p>

                <hr className="my-8" />

                <h3 id="be-note" className="scroll-mt-24 text-xl md:text-2xl font-bold">Note importante</h3>
                <p className="text-sm">
                  Les informations ci‑dessus sont fournies à titre indicatif et ne remplacent pas les informations des administrations
                  compétentes en Belgique (SPF Mobilité, DIV, centres de contrôle technique, etc.). La réglementation pouvant évoluer, vérifiez
                  votre situation au moment des démarches ou rapprochez‑vous des services officiels.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

