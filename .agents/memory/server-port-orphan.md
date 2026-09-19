---
name: Port Server occupé
description: Résoudre un redémarrage du workflow Server bloqué par un ancien processus Next.js.
---

Un workflow Server marqué comme terminé peut laisser ses processus enfants Next.js actifs sur le port 5000. Le prochain démarrage échoue alors avec `EADDRINUSE`, même si l’interface indique que le workflow précédent est arrêté.

**Why:** Un processus enfant orphelin peut survivre à l’arrêt du workflow et continuer à écouter sur le port attendu.

**How to apply:** Si le workflow se termine sans exception applicative puis échoue avec `EADDRINUSE`, identifier les processus `next dev` et `next-server`, arrêter uniquement ceux liés au projet, puis redémarrer le workflow configuré.