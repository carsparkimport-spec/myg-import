---
name: Aperçu Server obsolète
description: Distinguer un rendu client périmé dans le cadre canvas du HTML réellement servi par Next.js.
---

Le cadre Server du canvas peut continuer à afficher un ancien composant après redémarrage du workflow, bascule d’état du cadre et suppression du cache `.next`, alors que la réponse HTML actuelle contient bien le nouveau rendu.

**Why:** Le client intégré peut échouer pendant l’hydratation et conserver visuellement l’ancien arbre, ce qui donne l’impression que les modifications de source ne sont pas appliquées.

**How to apply:** En cas de divergence, vérifier d’abord le HTML SSR avec une requête directe vers le domaine de développement. Si le HTML est correct mais le cadre reste ancien et que Turbopack signale une hydratation invalide, utiliser le serveur Next.js standard pour le Preview.