---
name: Aperçu Server obsolète
description: Distinguer un rendu client périmé dans le cadre canvas du HTML réellement servi par Next.js.
---

Le cadre Server du canvas peut continuer à afficher un ancien composant lorsque les scripts `/_next/static` sont servis avec un cache immutable en développement, alors que la réponse HTML actuelle contient déjà le nouveau rendu.

**Why:** Un cache longue durée sur les bundles de développement associe un ancien composant client à un HTML serveur récent, provoquant une erreur d’hydratation et parfois un ancien rendu visuel.

**How to apply:** Garder le cache immutable uniquement en production et servir `/_next/static` avec `no-store` en développement. Après correction, supprimer `.next` et redémarrer le workflow une fois.