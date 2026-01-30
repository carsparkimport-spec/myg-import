"use client";

import Layout from '@/components/Layout';
import { useI18n } from '@/i18n/I18nProvider';

export default function BlogPage() {
  const { t } = useI18n();
  const annotationCodes = [
    'A1','A2','A3','U1','U2','U3','W1','W2','W3','P','S1','S2','S3','C1','C2','C3','Y1','Y2','Y3','X','XX','B1','B2','B3','E','G','D','P/R'
  ];
  return (
    <Layout title={t('blog.title')}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-deep-black">{t('blog.heading')}</h1>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-deep-black text-center tracking-tight leading-tight mb-2 md:mb-4">
            {t('blog.readTitle')}
          </h2>
        </div>
        {/* Sheet + legend within a single framed card */}
        <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <img
              src="/images/auction-sheets/auction-sheet.jpg"
              alt={t('blog.imageAlt')}
              className="w-full h-auto rounded-md object-contain max-h-[480px] md:max-h-[720px]"
              loading="eager"
            />
            <p className="text-gray-500 text-sm mt-2">{t('blog.imageCaption')}</p>
          </div>
          <div className="md:max-h-[720px] overflow-auto">
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 10 }).map((_, idx) => {
                const i = idx + 1;
                const colorClasses = [
                  'bg-red-600',
                  'bg-blue-600',
                  'bg-green-500',
                  'bg-orange-500',
                  'bg-black',
                  'bg-sky-500',
                  'bg-yellow-400 text-black',
                  'bg-orange-500',
                  'bg-red-600',
                  'bg-violet-600',
                ];
                const badge = colorClasses[idx] || 'bg-gray-500';
                return (
                  <div key={i} className="rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center justify-center w-8 h-8 text-white rounded-full ${badge}`}>{i}</span>
                      <h3 className="font-semibold text-black">{t(`blog.guide.items.${i}.title`)}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{t(`blog.guide.items.${i}.desc`)}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">{t('blog.guide.tipsTitle')}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>{t('blog.guide.tips.1')}</li>
                <li>{t('blog.guide.tips.2')}</li>
                <li>{t('blog.guide.tips.3')}</li>
                <li>{t('blog.guide.tips.4')}</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      {/* Annotation codes table */}
      <div className="max-w-6xl mx-auto mt-8 rounded-xl bg-white p-4 md:p-6 shadow ring-1 ring-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-deep-black text-center">{t('blog.annotations.title')}</h2>
        <p className="text-gray-600 text-sm text-center mt-2">{t('blog.annotations.subtitle')}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-700">
              <tr>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.code')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.jp')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.desc')}</th>
                <th className="py-2 pr-4 font-semibold">{t('blog.annotations.headers.size')}</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {annotationCodes.map((code) => (
                <tr key={code} className="border-t border-gray-200">
                  <td className="py-2 pr-4 font-mono text-black">{code}</td>
                  <td className="py-2 pr-4 text-gray-800">{t(`blog.annotations.items.${code}.jp`)}</td>
                  <td className="py-2 pr-4 text-gray-800">{t(`blog.annotations.items.${code}.desc`)}</td>
                  <td className="py-2 pr-4 text-gray-800 whitespace-nowrap">{t(`blog.annotations.items.${code}.size`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Note under the table */}
      <div className="max-w-6xl mx-auto mt-4 rounded-xl bg-yellow-50 p-4 md:p-5 ring-1 ring-yellow-200">
        <h3 className="text-base md:text-lg font-semibold text-yellow-900">{t('blog.annotations.note.title')}</h3>
        <ul className="list-disc pl-5 text-sm md:text-base text-yellow-900 space-y-1 mt-2">
          <li>{t('blog.annotations.note.items.1')}</li>
          <li>{t('blog.annotations.note.items.2')}</li>
          <li>{t('blog.annotations.note.items.3')}</li>
          <li>{t('blog.annotations.note.items.4')}</li>
          <li>{t('blog.annotations.note.items.5')}</li>
          <li>{t('blog.annotations.note.items.6')}</li>
        </ul>
      </div>

      {/* Shaken Article */}
      <div className="max-w-6xl mx-auto mt-16 rounded-xl bg-white p-4 md:p-8 shadow ring-1 ring-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-deep-black mb-4">
          Rapport sur le contrôle technique japonais « Shaken »
        </h2>
        <p className="text-gray-700 mb-8">
          Le Shaken (pour jidōsha kensa tōroku, inspection et enregistrement automobile) est le contrôle technique obligatoire au Japon pour les voitures particulières et véhicules motorisés de plus de 250 cm³. Ce rapport détaille les coûts moyens du Shaken, ses exigences techniques, les pratiques d'entretien entre deux inspections et l'impact de ce système sur la qualité des véhicules d'occasion exportés, afin de fournir des informations fiables.
        </p>

        <h3 className="text-xl font-bold text-deep-black mt-8 mb-3">1. Coût complet du Shaken et ventilation des frais</h3>
        <p className="text-gray-700 mb-4">La facture totale d'un Shaken est relativement élevée comparée à un contrôle technique européen. En moyenne, une voiture de tourisme génère une dépense d'environ 100 000 à 200 000 ¥ (560 à 1 120 €) tous les deux ans pour son Shaken. Ce coût se décompose en plusieurs postes obligatoires :</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Frais d'inspection technique (main d'œuvre et centre agréé)</h4>
        <p className="text-gray-700 mb-4">Si le propriétaire confie le véhicule à un garage ou concessionnaire, celui-ci facture généralement la préparation et la présentation au Shaken. Cela inclut une inspection préliminaire de conformité (souvent ~20 000 ¥ - 112€), un frais de vérification des normes de sécurité (~10 000 ¥ - 56€) et parfois un frais d'agence pour le service (~10 000 ¥). En revanche, un propriétaire procédant lui-même (user shaken) ne paie pas ces coûts de service et ne s'acquitte que des frais réglementaires. Dans tous les cas, le passage sur le banc officiel engendre un frais de test du centre d'environ 2 000 ¥ - 11,2€ (via l'achat de timbres fiscaux).</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Taxes obligatoires</h4>
        <p className="text-gray-700 mb-4">Le Shaken s'accompagne du règlement de plusieurs taxes pour la période de validité à venir (deux ans pour une voiture particulière). La principale est la taxe de poids du véhicule (jūryōzei), calculée selon la masse du véhicule et majorée pour les voitures anciennes. Par exemple, pour une voiture standard de moins de 1 t, la taxe poids est 16 400 ¥ - 92€ pour 2 ans ; si le poids est entre 1 et 1,5 t : 24 600 ¥ - 138€; plus de 1,5 t : 32 800 ¥ - 184€. Au-delà de 13 ans d'âge, ces montants augmentent d'environ 39% (et encore +10% après 18 ans). Les frais administratifs incluent aussi un petit timbre fiscal (environ 1 200 ¥) sur les documents officiels.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Assurance obligatoire Jibaiseki (Jibaiseki hoken)</h4>
        <p className="text-gray-700 mb-4">Il s'agit de l'assurance responsabilité civile automobile que le propriétaire doit renouveler lors du Shaken pour couvrir les deux années à venir. Son coût est fixé nationalement et a récemment baissé grâce à la diminution des accidents. Pour une voiture particulière, la prime sur 24 mois est d'environ 17 650 ¥ - 99€ (tarif 2023). Les kei cars (véhicules légers à plaque jaune) bénéficient d'un tarif presque équivalent (≈17 540 ¥) légèrement inférieur du fait de leur gabarit.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Entretien et réparations préalables</h4>
        <p className="text-gray-700 mb-4">Avant la présentation au Shaken, il est fréquent de réaliser des réparations ou remplacements des pièces d'usure afin d'assurer la conformité. Le Shaken lui-même n'inclut pas la maintenance du véhicule, il ne fait que la contrôler. Cependant, dans la pratique du "maintenance Shaken", les garages profitent souvent de l'échéance pour effectuer l'entretien courant en même temps. Les postes fréquents incluent le changement de pneus, le remplacement des plaquettes ou disques de frein, la réparation d'amortisseurs, d'échappement ou de rotules de suspension, et le réglage des phares.</p>
        
        <h4 className="font-semibold text-black mt-6 mb-2">Résumé des coûts typiques du Shaken (voiture particulière standard)</h4>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
          <li>Inspection au centre (test) : ~2 000 ¥ - 11,20€</li>
          <li>Timbres administratifs : ~1 200 ¥ - 6,70€</li>
          <li>Taxe de poids (2 ans) : 16 400 ¥ - 92€ (voiture ~1 t) jusqu'à 32 800 ¥ - 184€ (plus de 1,5 t) (+39% si plus de 13 ans)</li>
          <li>Assurance Jibaiseki (2 ans) : ~17 650 ¥ - 99€</li>
          <li>Frais de service garage (optionnel) : ~40 000 ¥ - 224€</li>
          <li>Entretien / pièces avant inspection : Variable (~20 000–50 000 ¥ - 112€ à 280€)</li>
        </ul>

        <h3 className="text-xl font-bold text-deep-black mt-8 mb-3">2. Exigences techniques et points vérifiés au Shaken</h3>
        <p className="text-gray-700 mb-4">Le contrôle Shaken comporte plus de 60 points de vérification visant à s'assurer que le véhicule est conforme aux normes de sécurité routière et environnementale japonaises. Il est à la fois plus strict et plus exhaustif que le contrôle technique français, avec des seuils de conformité exigeants et une attention particulière aux modifications du véhicule. Les principaux volets techniques inspectés sont :</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Carrosserie et dimensions extérieures</h4>
        <p className="text-gray-700 mb-4">Toute modification de carrosserie excessive ou non homologuée entraîne un refus. Par exemple, aucun élément saillant ne doit dépasser du gabarit d'origine – un embout d'échappement ne peut pas ressortir au-delà de la carrosserie. Les kits carrosserie ou élargisseurs d'ailes sont tolérés uniquement s'ils sont correctement ajustés et n'augmentent pas les dimensions hors tout au-delà des limites légales. Les ailerons ne doivent pas excéder la largeur de la voiture et doivent être fixés solidement sur le coffre.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Équipements lumineux et visibilité</h4>
        <p className="text-gray-700 mb-4">L'intégralité des feux doit être en état de fonctionnement (phares, feux de position, clignotants, feux de freinage, de recul, warnings, etc.) et conformes en couleur et intensité. Un réglage précis des phares est contrôlé au banc : l'alignement en hauteur et la portée doivent respecter les valeurs standard sous peine de contre-visite. Les vitres avant conducteur et passager ne doivent pas être teintées (teinte d'origine très légère tolérée, mais aucun film foncé) afin de préserver la transparence.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Système de freinage et roues</h4>
        <p className="text-gray-700 mb-4">Le banc d'essai vérifie l'efficacité des freins sur chaque essieu et l'équilibre du freinage. La puissance de freinage mesurée doit atteindre les minima réglementaires. On contrôle visuellement l'absence de fuites de liquide et l'épaisseur des plaquettes. Les pneus sont inspectés pour s'assurer qu'ils ne sont pas lisses, craquelés ou endommagés. La loi japonaise impose une profondeur de sculpture suffisante et des dimensions conformes à la carte de conformité du véhicule.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Direction et suspension</h4>
        <p className="text-gray-700 mb-4">La direction ne doit présenter aucun jeu excessif. Le contrôle inclut un test du volant et de la géométrie (l'auto doit braquer correctement de part et d'autre sur un angle normalisé). La suspension est minutieusement vérifiée : aucune pièce ne doit être fissurée ou corrodée dangereusement (ressorts, amortisseurs, bras). Les silentblocs, rotules et articulations doivent être en bon état. Le véhicule doit respecter une hauteur minimale de caisse : typiquement 8 cm de garde au sol pour un empattement ~2 m, 9 cm si empattement ~2,5 m.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Compteur de vitesse</h4>
        <p className="text-gray-700 mb-4">Le Shaken inclut un test d'odomètre/vitesses sur rouleaux. Le contrôleur fait accélérer le véhicule sur un banc à 40 km/h (deux fois) et compare l'indication du compteur à la vitesse réelle. Une discordance significative (compteur trop optimiste ou non-fonctionnel) entraînera un échec. Ce point assure que le conducteur peut évaluer correctement sa vitesse.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Moteur, pollution et bruit</h4>
        <p className="text-gray-700 mb-4">Un volet crucial concerne les émissions polluantes. Le contrôle antipollution mesure les gaz d'échappement, notamment le monoxyde de carbone (CO) et les hydrocarbures imbrûlés (HC). Le Japon impose des limites strictes : pour les voitures de moins de 10 ans, le CO ne doit pas dépasser 1% du volume et les HC pas plus de 300 ppm ; pour les véhicules plus anciens (plus de 10 ans), jusqu'à 4,5% de CO et 1200 ppm de HC sont tolérés. Le niveau sonore de l'échappement est mesuré avec un sonomètre à 50 cm du tuyau. Le bruit d'échappement maximal autorisé est d'environ 96 dB(A) pour les voitures de moins de 10 ans, et 103 dB pour les plus anciennes.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Habitacle et sécurité intérieure</h4>
        <p className="text-gray-700 mb-4">Le contrôleur inspecte l'intérieur pour des éléments de sécurité de base. Les ceintures de sécurité doivent être présentes et en bon état de fonctionnement (verrouillage, enroulement). Le tableau de bord ne doit pas afficher de voyants d'alerte critique (ex : airbag ou ABS allumé en permanence). On vérifie que le klaxon fonctionne, ainsi que le désembuage, essuie-glaces, etc.</p>
        
        <p className="text-gray-700 mb-4 italic">En cas d'échec sur l'un quelconque de ces points, le véhicule doit être réparé puis représenté à l'inspection. Le Shaken est donc un examen très rigoureux, qui dissuade fortement les modifications non homologuées et garantit qu'un véhicule en circulation respecte des normes strictes de sécurité, de bruit et d'émissions.</p>

        <h3 className="text-xl font-bold text-deep-black mt-8 mb-3">3. Pratiques courantes d'entretien entre deux Shaken</h3>
        <p className="text-gray-700 mb-4">Entre deux inspections Shaken (espacées de 2 ans, sauf pour les véhicules neufs qui bénéficient de 3 ans avant la première), les automobilistes japonais observent généralement un entretien régulier et sérieux de leur véhicule. Cette culture de la maintenance préventive est à la fois encouragée par la réglementation et ancrée dans les habitudes des usagers.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Révisions périodiques obligatoires</h4>
        <p className="text-gray-700 mb-4">La loi japonaise impose formellement des inspections et entretiens périodiques en plus du Shaken lui-même. Concrètement, il est recommandé d'effectuer un contrôle annuel (12 mois) et même un petit contrôle à 6 mois, comme une sorte de « visite médicale » du véhicule. Ces révisions, appelées tenken, incluent vidanges, vérification des freins, niveaux de fluides, etc., et doivent être consignées dans le carnet d'entretien du véhicule (Inspection and Maintenance Record Book).</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Suivi en concession et pièces d'origine</h4>
        <p className="text-gray-700 mb-4">Il est très courant que les Japonais fassent entretenir leur voiture au réseau constructeur ou dans des ateliers spécialisés, même pour des opérations banales. La fierté de propriété et la volonté de conserver le véhicule « comme neuf » incitent à respecter scrupuleusement le plan d'entretien du manufacturier. Par exemple, Toyota ou Honda préconisent souvent des intervalles plus rapprochés que les normes européennes. Un moteur japonais peut requérir une vidange d'huile tous les 5 000 miles (~8 000 km), là où un constructeur européen la recommande à 15 000 miles.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Soins généraux et usage précautionneux</h4>
        <p className="text-gray-700 mb-4">Au-delà des obligations formelles, la mentalité japonaise valorise un entretien quasi-maniaque. Les propriétaires veillent à garder leur véhicule propre et en bon état. Par exemple, lavages fréquents et polish préservent la peinture, et l'intérieur est souvent impeccable (beaucoup de Japonais s'abstiennent de manger ou fumer dans leur voiture). Les pièces d'usure comme les plaquettes de frein, essuie-glaces, filtres, etc., sont remplacées dès qu'elles montrent des signes de fatigue.</p>
        
        <h4 className="font-semibold text-black mt-4 mb-2">Réparations préventives</h4>
        <p className="text-gray-700 mb-4">Plutôt que d'attendre la panne, les conducteurs nippons ont tendance à faire réparer le moindre bruit ou voyant suspect immédiatement. Un claquement dans la suspension, un léger jeu dans la direction ou un suintement d'huile – autant de soucis qu'ils feront corriger en atelier sans tarder. Cette approche préventive, combinée à la qualité de construction des véhicules japonais, fait qu'une voiture bénéficie souvent de nombreux remplacements anticipés de pièces.</p>

        <h3 className="text-xl font-bold text-deep-black mt-8 mb-3">Conclusion</h3>
        <p className="text-gray-700">En résumé, la période entre deux Shaken est marquée au Japon par une maintenance continue et rigoureuse. La combinaison d'exigences légales (inspection annuelle recommandée) et de la culture locale de soin apporté aux objets garantit que les voitures restent en excellent état de fonctionnement à tout moment, pas uniquement pour « passer le contrôle ». Ce souci d'entretien permanent rejaillit directement sur la qualité des véhicules japonais d'occasion.</p>
      </div>

      </div>
    </Layout>
  );
}