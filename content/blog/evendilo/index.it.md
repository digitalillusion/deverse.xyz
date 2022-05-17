---
title: evendilo
date: "2020-04-14T08:53:00.000Z"
description: Uno strumento per sincronizzare l'inventario di un negozio online da un file excel verso Woocommerce ed ebay.
coverImage: cover.jpg
language: it
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

Uno strumento per sincronizzare l'inventario di un negozio online da un file excel verso Woocommerce ed ebay.

Consente la creazione del prodotto e l'aggiornamento di caratteristiche come categoria, prezzo, quantità, immagini e descrizione direttamente nel file excel, quindi caricato tramite l'interfaccia utente minimale.

Per ogni riga del file excel viene generato in tempo reale un report che indica se la riga è stata importata correttamente o se si è verificato un errore.

Il file excel contiene un set specifico di colonne e un timestamp per ogni riga aggiunta o modificata, in modo che i dati vengano recuperati dal posto giusto e vengano elaborate solo le righe nuove e aggiornate, riducendo notevolmente i tempi di attesa.
