# Origine et contrôle des données

Ce document résume d'où viennent les données de l'application et ce qui a été vérifié. Les mêmes indications figurent dans la section « À propos et crédits » de l'application.

## Étoiles et noms

**Source** : « IAU Catalog of Star Names » (groupe de travail sur les noms d'étoiles de l'Union astronomique internationale), version du 4 avril 2022, publiée sous licence Creative Commons Attribution. Les positions du catalogue viennent d'Hipparcos (nouvelle réduction), de Gaia DR2 ou de Tycho-2 (époque et équinoxe J2000, ICRS). Les noms adoptés après cette version ne figurent pas dans l'application.

**Utilisation**
- Coordonnées de 73 étoiles de la liste principale et de 55 sommets de figures ; noms, désignations de Bayer et de Flamsteed, constellations, identifiants HIP, HD et HR de 246 fiches. Parmi elles, 143 étoiles nommées ont été ajoutées à partir des sommets des tracés : 54 dans les 17 figures d'origine (qui n'avaient pas de nom pour ces sommets) et 90 dans les figures des autres constellations (Sheliak, Tarazed, Rasalgethi, Mebsuta…). Ces fiches donnent la magnitude V du catalogue, celle de l'étoile principale pour les systèmes multiples ; 62 autres étoiles nommées du catalogue ne correspondent à aucun sommet et sont donc absentes.
- Contrôle croisé des 143 étoiles ajoutées : chaque étoile n'est retenue que si un sommet, saisi indépendamment, se trouve à moins de 0,03° de sa position. Écart médian 0,5″ pour les figures d'origine (positions saisies à la main) et 0,1″ pour les figures de d3-celestial ; maximum 8″ et 19″. Position finale : celle du catalogue.
- Contrôle croisé des étoiles initiales : les coordonnées saisies auparavant à la main s'écartent de celles du catalogue de 0,1″ en médiane et de 1,8″ au maximum (Castor). Les 103 désignations de Bayer et les constellations des fiches concordent avec le catalogue, à une précision près (Algieba est γ¹ du Lion).
- Un sommet de figure qui doublait l'étoile Acrab (dessinée deux fois) a été corrigé.

**Tracés des constellations**
- **Source** : fichier `constellations.lines.json` du projet d3-celestial d'Olaf Frohn (licence BSD à 3 clauses, texte dans `LICENCE-d3-celestial.txt`). Les lignes viennent de la page des constellations de l'Union astronomique internationale, avec quelques modifications de l'auteur. Coordonnées J2000.
- **Utilisation** : 71 constellations, soit 549 sommets et 525 segments. Les 17 constellations d'origine (les 13 du zodiaque avec Ophiuchus, Orion, Cassiopée, la Grande et la Petite Ourse) conservent les figures dessinées pour l'application.
- **Étoiles des tracés** : 61 sommets coïncident (à 0,02° près) avec une étoile de la carte et reprennent son nom et sa magnitude. 90 autres coïncident avec une étoile nommée du catalogue de l'UAI et en reprennent le nom, les identifiants et la magnitude V. Les 398 restants n'ont pas de magnitude connue dans l'application : ils sont notés 4,5 et dessinés comme des étoiles faibles, sans nom.
- **Contrôle de la saisie** : le fichier a été recopié dans l'application (il n'a pas pu être téléchargé par un script). Pour le vérifier, ses sommets ont été comparés à des positions saisies indépendamment : 134 des 218 sommets des 17 constellations d'origine coïncident à 0,02° près avec les figures saisies auparavant à la main, et 112 sommets coïncident avec des étoiles du catalogue de l'UAI. Aucun sommet ne tombe à une distance intermédiaire (de 0,02° à 0,4°) d'une étoile connue, ce qui écarte les fautes de saisie grossières ; le plus long segment mesure 26° (Carène). Les autres sommets n'ont pas de recoupement indépendant.
- **Limite** : le dessin est celui de d3-celestial : certaines constellations n'ont que peu de traits (Croix du Sud : quatre étoiles ; Chiens de chasse : deux).

**Appartenance aux constellations** : la constellation de chaque étoile est celle de la colonne « constellation » du catalogue de l'UAI pour 246 étoiles ; pour les 8 étoiles absentes du catalogue, elle est déduite de la désignation de Bayer (γ Cassiopée, γ² Voiles, γ Centaure, α Loup, ε et η du Centaure, κ Scorpion, ζ Ophiuchus). Les 7 étoiles des Pléiades sont rattachées au Taureau, comme dans le catalogue. Au survol d'une étoile, l'application affiche les autres étoiles de la carte qui appartiennent à la même constellation et, quand elle existe, le tracé de la constellation. Les tracés des 17 constellations d'origine sont des figures schématiques dessinées pour l'application, sans source externe ; ceux des 71 autres viennent de d3-celestial (voir plus haut).

**Magnitudes et complétude** : magnitudes visuelles apparentes et liste des 93 étoiles de magnitude 2,5 ou moins d'après la liste « List of brightest stars » de Wikipédia (l'application vérifie que les 93 sont présentes). Le catalogue de l'UAI donne la magnitude de la seule étoile principale pour certains systèmes multiples (Acrux 1,33, Mizar 2,23…) ; on garde ici la magnitude d'ensemble, plus représentative de l'éclat visible.

**Non couvert par le catalogue, donc saisi à la main** : γ Cassiopée, Regor (γ² Voiles), Muhlifain (γ Centaure), Uridim (α Loup), ε et η du Centaure, Girtab (κ Scorpion), Han (ζ Ophiuchus), et 34 sommets sans nom dans les figures d'origine (étoiles faibles). Seule Regor a été recoupée avec Wikipédia (coordonnées identiques à la seconde d'arc). La précision des autres n'a pas été mesurée ; pour les sommets nommés, dont on peut la mesurer, elle est de 2″ au plus.

**Ignoré** : les mouvements propres. Les coordonnées du catalogue sont celles de l'époque 2000 ; sur les cent ans de part et d'autre, l'écart reste de quelques minutes d'arc au plus pour les étoiles les plus rapides (α Centauri se déplace d'environ 3,7″ par an), donc imperceptible.

## Soleil, Lune et planètes

**Méthode retenue** : éléments orbitaux simplifiés et termes de perturbation de Paul Schlyter (« How to compute planetary positions », d'après Van Flandern et Pulkkinen, 1980). Positions géocentriques moyennes de la date ; aberration, nutation et temps de trajet de la lumière ne sont pas pris en compte.

**Contrôle 1 : exemples de référence de Jean Meeus (*Astronomical Algorithms*)**
| Astre et date | Écart |
|---|---|
| Soleil, 13 octobre 1992 | 5″ |
| Vénus, 20 décembre 1992 | 6″ en longitude |
| Lune, 12 avril 1992 | 1,5′ en longitude, 0,5′ en latitude |

**Contrôle 2 : éléments approchés de JPL (E. M. Standish, tableau 1800-2050)**
Comparaison de la longitude géocentrique à sept dates (1900, 1950, 2000, 2026, 2050, 2075, 2100) :
| Astre | Écart maximal |
|---|---|
| Soleil, Mercure, Vénus, Mars | 0,003° |
| Uranus, Neptune, Pluton | 0,03° |
| Jupiter | 0,11° |
| Saturne | 0,21° |

Pour Jupiter et Saturne, JPL indique lui-même une erreur nominale de 0,11° et 0,17° (400″ et 600″ en longitude héliocentrique), tandis que Schlyter annonce environ une minute d'arc pour les planètes extérieures. La méthode de Schlyter est donc conservée pour tous les astres : l'approximation de JPL n'apporte pas de gain, et elle en fait perdre pour ces deux planètes.

**Ce qui serait meilleur** : des éphémérides de JPL (DE440), disponibles via le système Horizons, donneraient une précision de l'ordre de la seconde d'arc. Ce n'est pas accessible depuis l'environnement où l'application a été développée (pas d'accès réseau) et l'écart, de l'ordre de la minute d'arc, est imperceptible au dessin (un degré occupe environ trois pixels au zoom 1).

## Interactions (constellations et fiches)

- **Un clic ou un toucher** sur une étoile, un tracé, un signe ou une maison ouvre sa fiche et, si elle appartient à une constellation pas encore affichée, la fait apparaître durablement. Cliquer sur un autre élément de la même constellation change seulement la fiche affichée : la constellation reste en place, pour pouvoir lire plusieurs fiches de suite sans la perdre.
- **Un second clic sur l'élément déjà pointé** referme juste la fiche.
- **Un double clic ou un double toucher rapproché** (moins de 400 ms) sur le même élément fait disparaître la constellation.
- **La croix** en haut à droite d'une fiche épinglée la referme, sans toucher à la constellation affichée.

## Lisibilité et code visuel

- **Bouton « Aa »** (vue horizon) : trois tailles pour les noms d'étoiles et de constellations sur la carte (×0,85, ×1, ×1,2).
- **Soleil et Lune** : teinte ambrée (`--lum`, #B8862E en clair, #E0A845 en sombre) et gras, sur la roue, l'horizon et la liste des positions. Aucun autre astre ne porte cette teinte.
- **Constellations** : noms en petites capitales espacées (`letter-spacing`), sans couleur ajoutée.
- **Étoiles** : noms en couleur pleine (encre du thème) au lieu d'un gris atténué.

## Mythes et origines des constellations

Les 17 premières constellations (zodiaque, Orion, Cassiopée, Grande et Petite Ourse) ont des fiches rédigées à partir d'articles de Wikipédia en français. Les 71 autres ont une fiche dont la source est indiquée en tête :

| Type de fiche | Nombre | Source |
|---|---|---|
| Mythe, d'après des extraits d'articles Wikipédia (Andromède, Persée, Corbeau, Coupe, Hydre, Éridan) | 6 | Wikipédia (français) |
| Constellation moderne : origine, auteur et date | 37 | Article « Constellation » de Wikipédia (français) |
| Constellation ancienne : résumé de la tradition grecque | 28 | Résumé rédigé pour l'application, sans article précis ; l'origine de la constellation (Ptolémée, Hipparque, Conon de Samos…) vient de l'article « Constellation » |

**Limite** : ces 28 résumés de la tradition grecque (Aigle, Autel, Cocher, Bouvier, Cygne, Dauphin, Dragon, Hercule, Lyre, Pégase, etc.) n'ont pas été recoupés avec un article précis : ils reprennent les récits classiques, avec des variantes quand les auteurs anciens divergent. Remplacer leur texte par un résumé d'article (champs `t`, `s`, `l` du fichier `content.json`) suffit pour les sourcer.

Les constellations modernes n'ont pas de mythe antique : leur fiche indique qui les a créées et quand (Keyser et de Houtman via Bayer en 1603, Bartsch en 1624, Hevelius vers 1690, Lacaille en 1763). L'article « Constellation » attribue la Mouche à Lacaille ; d'autres sources la font remonter aux navigateurs néerlandais, le texte suit l'article.

## Autres données

- **Limites des constellations zodiacales** : longitudes écliptiques relevées par Guy Ottewell (Universal Workshop), corrigées de la précession.
- **Maisons astrologiques** : formules classiques (Ascendant, Milieu du Ciel, Placidus par itération, Porphyre, signes entiers, maisons égales). Vérifiées numériquement : Ascendant sur l'horizon à l'est, Milieu du Ciel sur le méridien, fractions de demi-arc de Placidus respectées.
- **Textes** (mythes, signes, maisons, interprétations des planètes, fiches d'étoiles) : résumés reformulés d'articles de Wikipédia en français (CC BY-SA).
- **Noms des 88 constellations** : liste de l'Union astronomique internationale ; noms français saisis d'après l'usage courant, sans recoupement avec une source.
