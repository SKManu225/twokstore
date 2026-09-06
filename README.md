# Two K Store — Site web

Marque mode/streetwear du groupe **Vicol SARL**, spécialisée dans la personnalisation de sacs (Eastpak, Longchamp, Essentials). Site statique (HTML/CSS/JS), aucun backend.

## Contenu

```
two-k-store-site/
├── index.html            Accueil
├── boutique.html         Catalogue (filtrable par catégorie)
├── personnalisation.html Page phare : personnalisation de sacs
├── commandes.html        Fonctionnement des commandes + acompte
├── a-propos.html         La marque + lien avec Vicol SARL
├── contact.html          Coordonnées + formulaire
├── 404.html
├── css/styles.css
├── js/main.js
├── assets/               4 logos SVG (fournis par le client)
├── CNAME                 twokstore.vitrinemarket.org
├── robots.txt
└── sitemap.xml
```

## ⚠️ À faire avant / après la mise en ligne

1. **Photos** : tous les visuels sont des placeholders (blocs texturés avec légende). Il suffit de remplacer chaque `<div class="ph">...</div>` par une vraie `<img>` au fur et à mesure que les photos arrivent (produits, créations personnalisées, visuel hero).
2. **Canal WhatsApp** : pas encore créé. Une fois disponible, renseigner son lien dans `js/main.js` → variable `WHATSAPP_CHANNEL_URL`. En attendant, le bouton "Canal WhatsApp" ouvre une conversation WhatsApp classique.
3. **Promotion Eastpak** (15 000 FCFA au lieu de 20 000, jusqu'au lundi 7 septembre 2026) : le bandeau se masque **automatiquement** après cette date (variable `PROMO_END` dans `js/main.js`). Pour une nouvelle promotion, modifier `PROMO_END` et `PROMO_TEXT` dans ce même fichier, et penser à retirer le badge promo sur la fiche produit correspondante si besoin.
4. **Numéro WhatsApp** : `+225 07 18 44 40 91`, déjà configuré (`WHATSAPP_NUMBER` dans `js/main.js`).

## Déploiement — GitHub Pages

1. Créer un dépôt GitHub, y pousser l'intégralité de ce dossier (le fichier `CNAME` doit rester à la racine).
2. Dans **Settings → Pages** du dépôt, activer GitHub Pages sur la branche principale.
3. Dans les réglages DNS de `vitrinemarket.org`, ajouter un enregistrement **CNAME** :
   `twokstore` → `<ton-compte>.github.io`
4. Le site sera accessible sur **https://twokstore.vitrinemarket.org** (activer "Enforce HTTPS" dans les réglages GitHub Pages une fois le certificat généré).

Aucune base de données ni serveur applicatif requis.
