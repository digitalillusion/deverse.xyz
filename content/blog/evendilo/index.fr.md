---
title: evendilo
date: "2020-04-14T08:53:00.000Z"
description: Un outil pour synchroniser un inventaire de boutique en ligne à partir d'un fichier excel vers Woocommerce et ebay.
coverImage: cover.jpg
language: fr
category: webapps
links:
tags:
  - javascript
  - gatsby
  - react
  - kotlin
  - postgresql
  - heroku
  - docker
---

Un outil pour synchroniser un inventaire de boutique en ligne à partir d'un fichier excel vers Woocommerce et ebay.

Permet la création du produit et la mise à jour des caractéristiques telles que la catégorie, le prix, la quantité, les images et la description directement dans le fichier Excel, puis téléchargé via l'interface utilisateur minimale.

Pour chaque ligne du fichier excel, un rapport est généré en temps réel, indiquant si la ligne a été importée correctement ou s'il y a eu une erreur.

Le fichier Excel contient un ensemble spécifique de colonnes et un horodatage pour chaque ligne ajoutée ou modifiée, afin que les données soient récupérées au bon endroit et que seules les lignes nouvelles et mises à jour soient traitées, ce qui réduit considérablement le temps d'attente.
