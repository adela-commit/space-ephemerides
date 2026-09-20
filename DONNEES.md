# Origine et contrôle des données

Ce document résume d'où viennent les données de l'application et ce qui a été vérifié. Les mêmes indications figurent dans la section « À propos et crédits » de l'application.

## Étoiles et noms

**Source** : « IAU Catalog of Star Names » (groupe de travail sur les noms d'étoiles de l'Union astronomique internationale), version du 4 avril 2022, publiée sous licence Creative Commons Attribution. Les positions du catalogue viennent d'Hipparcos (nouvelle réduction), de Gaia DR2 ou de Tycho-2 (époque et équinoxe J2000, ICRS). Les noms adoptés après cette version ne figurent pas dans l'application.

**Utilisation**
- Coordonnées de 73 étoiles de la liste principale et de 55 sommets de figures ; noms, désignations de Bayer et de Flamsteed, constellations, identifiants HIP, HD et HR de 103 fiches.
- Contrôle croisé : les coordonnées saisies auparavant à la main s'écartent de celles du catalogue de 0,1″ en médiane et de 1,8″ au maximum (Castor). Les 103 désignations de Bayer et les constellations des fiches concordent avec le catalogue, à une précision près (Algieba est γ¹ du Lion).
- Un sommet de figure qui doublait l'étoile Acrab (dessinée deux fois) a été corrigé.

**Appartenance aux constellations** : la constellation de chaque étoile est celle de la colonne « constellation » du catalogue de l'UAI pour 103 étoiles ; pour les 8 étoiles absentes du catalogue, elle est déduite de la désignation de Bayer (γ Cassiopée, γ² Voiles, γ Centaure, α Loup, ε et η du Centaure, κ Scorpion, ζ Ophiuchus). Les 7 étoiles des Pléiades sont rattachées au Taureau, comme dans le catalogue. Au survol d'une étoile, l'application affiche les autres étoiles de la carte qui appartiennent à la même constellation et, quand elle existe, le tracé de la constellation. Les **tracés** sont des figures schématiques dessinées pour l'application : ils n'ont pas de source externe, et 17 constellations seulement en ont un.

**Magnitudes et complétude** : magnitudes visuelles apparentes et liste des 93 étoiles de magnitude 2,5 ou moins d'après la liste « List of brightest stars » de Wikipédia (l'application vérifie que les 93 sont présentes). Le catalogue de l'UAI donne la magnitude de la seule étoile principale pour certains systèmes multiples (Acrux 1,33, Mizar 2,23…) ; on garde ici la magnitude d'ensemble, plus représentative de l'éclat visible.

**Non couvert par le catalogue, donc saisi à la main** : γ Cassiopée, Regor (γ² Voiles), Muhlifain (γ Centaure), Uridim (α Loup), ε et η du Centaure, Girtab (κ Scorpion), Han (ζ Ophiuchus), et 88 sommets sans nom dans les figures (étoiles faibles). Seule Regor a été recoupée avec Wikipédia (coordonnées identiques à la seconde d'arc). La précision des autres n'a pas été mesurée ; pour les sommets nommés, dont on peut la mesurer, elle est de 2″ au plus.

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

## Autres données

- **Limites des constellations zodiacales** : longitudes écliptiques relevées par Guy Ottewell (Universal Workshop), corrigées de la précession.
- **Maisons astrologiques** : formules classiques (Ascendant, Milieu du Ciel, Placidus par itération, Porphyre, signes entiers, maisons égales). Vérifiées numériquement : Ascendant sur l'horizon à l'est, Milieu du Ciel sur le méridien, fractions de demi-arc de Placidus respectées.
- **Textes** (mythes, signes, maisons, interprétations des planètes, fiches d'étoiles) : résumés reformulés d'articles de Wikipédia en français (CC BY-SA).
- **Noms des 88 constellations** : liste de l'Union astronomique internationale ; noms français saisis d'après l'usage courant, sans recoupement avec une source.
