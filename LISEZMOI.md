# Space Ephemerides : version installable, utilisable hors connexion

Cette version fonctionne sans connexion une fois installée sur le téléphone, et récupère de nouveaux contenus lorsque l’appareil est connecté.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L’application. Elle contient aussi les fiches par défaut, pour fonctionner même sans `content.json`. |
| `content.json` | Les fiches : mythes des constellations et des planètes, informations sur les étoiles. Modifiable sans toucher au code. |
| `sw.js` | Le « service worker » : conserve l’application sur l’appareil et vérifie les mises à jour. |
| `manifest.webmanifest` et `icon-*.png`, `apple-touch-icon.png` | Permettent d’ajouter l’application à l’écran d’accueil. |

Aucune dépendance externe : polices du système, aucun appel réseau en dehors de ces fichiers. Les calculs astronomiques se font sur l’appareil.

## 1. Publier le dossier

Le mode hors connexion exige une adresse en **https** (ou `localhost`). Il ne fonctionne donc ni depuis claude.ai, ni en ouvrant `index.html` directement depuis les fichiers du téléphone.

Il suffit de déposer le dossier sur un hébergeur de pages statiques, par exemple Netlify (dépôt par glisser-déposer du dossier), GitHub Pages ou Cloudflare Pages. Le site obtenu a une adresse que vous pouvez partager par message, courriel ou code QR.

Cette publication règle aussi le problème de la boussole sur iPhone : la page s’ouvre directement dans Safari, et non dans un cadre.

### Procédure avec GitHub Pages et le domaine `space-ephemerides.com`

**A. Publier les fichiers**
1. Créer un compte GitHub, puis un nouveau dépôt **public** (par exemple `space-ephemerides`). Un dépôt public rend le code visible de tous ; il reste « tous droits réservés », comme indiqué dans l’application.
2. Dans le dépôt : « Add file », puis « Upload files ». Déposer **le contenu** du dossier (`index.html`, `sw.js`, `content.json`…) à la racine du dépôt, et non le dossier lui-même. Valider (« Commit changes »).
3. Dans « Settings », puis « Pages » : choisir « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis enregistrer. Le site est alors disponible à l’adresse `https://VOTRE-NOM.github.io/space-ephemerides/`.

**B. Associer le domaine**
1. Chez le bureau d’enregistrement, acheter `space-ephemerides.com`. Recommandation de GitHub : vérifier d’abord le domaine dans les réglages de votre compte GitHub (« Pages », puis « Add a domain », avec un enregistrement TXT), pour éviter qu’un tiers ne le rattache à son dépôt.
2. Dans « Settings », puis « Pages », saisir `space-ephemerides.com` dans « Custom domain » et enregistrer. GitHub ajoute un fichier `CNAME` au dépôt.
3. Chez le bureau d’enregistrement, créer les enregistrements DNS :
   - domaine nu (`space-ephemerides.com`) : un enregistrement ALIAS ou ANAME vers `VOTRE-NOM.github.io`, ou à défaut quatre enregistrements A vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153` et `185.199.111.153` (vérifiez ces adresses dans la documentation de GitHub avant de les saisir) ;
   - `www` : un enregistrement CNAME vers `VOTRE-NOM.github.io` (sans le nom du dépôt). GitHub redirige alors l’une des deux adresses vers l’autre.
4. Patienter (jusqu’à 24 heures pour le DNS), puis cocher « Enforce HTTPS » dans « Settings », « Pages ». Cette case peut mettre jusqu’à 24 heures à devenir disponible.

Choisissez l’adresse définitive avant de diffuser : une application installée reste liée à l’adresse d’origine.

**C. Publier une mise à jour**
Remplacer les fichiers modifiés dans le dépôt (« Add file », « Upload files ») et valider. Pour un simple changement de fiches, il suffit de remplacer `content.json` en augmentant `"version"`.

## 2. Installer sur un téléphone

1. Ouvrir l’adresse **une première fois en étant connecté** et laisser la page se charger complètement.
2. **iPhone (Safari)** : bouton Partager, puis « Sur l’écran d’accueil ».
3. **Android (Chrome)** : menu, puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».

L’application s’ouvre ensuite comme une application ordinaire, y compris en mode avion. Le groupe « Hors connexion et mises à jour », en bas des commandes, indique la version de l’application et celle du contenu.

## 3. Mettre à jour

**Le contenu seul** (nouveaux mythes, corrections, nouvelle source de fiches) :
1. Modifier `content.json` sur l’hébergeur et augmenter le champ `"version"`.
2. Les appareils connectés récupèrent le nouveau contenu au lancement, ou en touchant « Rechercher des mises à jour ». Ils le gardent ensuite hors connexion.

**L’application** (modification de `index.html`) :
1. Remplacer `index.html` sur l’hébergeur et changer `VERSION` dans `sw.js` (par exemple `2026-10-01.1`).
2. Les appareils connectés affichent alors un bandeau « Une nouvelle version de l’application est disponible » avec un bouton « Recharger ».

Les hébergeurs conservent parfois les fichiers en cache quelques minutes : la nouvelle version peut donc apparaître avec un léger retard.

## 4. Format de `content.json`

```json
{
  "schema": 1,
  "version": "2026-09-19.1",
  "updated": "2026-09-19",
  "sources": {
    "wikipedia": {
      "name": "Wikipédia (français)",
      "constellations": [ { "t": "texte du mythe", "u": "https://…", "a": "titre de l’article" }, … ],
      "planets":        [ { "t": "texte du mythe", "l": ["Mars (planète)", "Mars (mythologie)"] }, … ],
      "stars":          { "Sirius": ["α Canis Majoris", "Grand Chien", "Sirius"], … }
    }
  }
}
```

- **`constellations`** : 18 entrées dans cet ordre : Bélier, Taureau, Gémeaux, Cancer, Lion, Vierge, Balance, Scorpion, Ophiuchus, Sagittaire, Capricorne, Verseau, Poissons, Orion, Cassiopée, Pléiades, Grande Ourse, Petite Ourse.
- **`planets`** : 10 entrées dans cet ordre : Soleil, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, Pluton. Dans `l`, une chaîne est un titre d’article Wikipédia ; on peut aussi écrire `{ "label": "…", "url": "https://…" }`.
- **`stars`** : nom de l’étoile, puis [désignation, constellation, titre de l’article Wikipédia]. Seules les étoiles déjà présentes sur la carte peuvent être survolées.
- **Autre source de fiches** (par exemple les *Catastérismes* d’Ératosthène) : ajouter une clé dans `sources`, avec les mêmes tableaux. Elle apparaît automatiquement dans la liste « Fiches ». Les sections absentes affichent « Pas de fiche ».

Le texte est toujours affiché comme du texte (jamais comme du code), et seuls les liens `http` et `https` sont acceptés. Un `content.json` invalide est refusé : l’appareil garde la dernière version valide.

## 5. Limites

- **Première ouverture** : elle doit se faire en ligne.
- **Liens Wikipédia** : ils ouvrent des pages web et exigent une connexion.
- **Stockage** : les systèmes mobiles peuvent effacer les données des sites peu utilisés. Une application ajoutée à l’écran d’accueil y est en principe moins exposée. Si l’application ne s’ouvre plus hors connexion, ouvrez-la une fois en ligne.
- **Boussole** : elle demande une autorisation à l’ouverture, et n’est disponible que sur les appareils équipés de capteurs.
- **Licences** : le code est publié sans licence (tous droits réservés, à titre personnel). Les fiches sont des résumés adaptés d’articles de Wikipédia et restent sous licence CC BY-SA. La section « À propos et crédits » de l’application donne les mentions nécessaires : conservez-la si vous modifiez l’application ou ajoutez des fiches tirées d’autres sources (en indiquant alors leur licence).
