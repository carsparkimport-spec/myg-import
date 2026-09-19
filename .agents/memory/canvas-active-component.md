---
name: Composant canvas actif
description: Règle de préservation des réglages manuels sur la maquette Europe active.
---

Pour la maquette Europe active, ne jamais reconnecter le cadre à une variante ou à un ancien composant. Ne pas créer de nouvelle variante pour une correction locale. Modifier uniquement le composant déjà affiché et préserver les ajustements manuels du canvas. Si le cadre artifact Server affiche un crash alors que le serveur et la capture directe sont sains, réinitialiser son cycle `modifying` puis `live` sans changer son URL ni sa géométrie.

**Why:** Des reconnexions successives à d’anciens composants ont écrasé des réglages manuels récents et provoqué des reprises inutiles. Le cadre Server peut aussi conserver un état d’erreur propre au canvas après que l’application a été corrigée.

**How to apply:** Avant toute modification, identifier le composant actuellement rendu par le cadre. Si l’utilisateur vient de modifier le canvas, ne pas relancer de génération ni reconnecter le cadre. Pour un artifact Server sain côté application, basculer seulement son état de cycle afin de vider l’overlay de crash. Utiliser un checkpoint avant toute restauration.