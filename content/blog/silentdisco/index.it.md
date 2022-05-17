---
title: silentdisco
date: "2019-03-21T12:30:00.000Z"
description: Un servizio di sincronizzazione temporale del flusso audio che può essere utilizzato per festeggiare.
coverImage: cover.jpg
language: it
category: mobileapps
links:
  - https://github.com/digitalillusion/silentdisco
tags:
  - javascript
  - nodejs
  - docker
---

Un servizio di sincronizzazione temporale del flusso audio che può essere utilizzato per festeggiare.

Prototipo di discoteca silenziosa, costruita su due componenti: la stazione radio (che utilizza azuracast) e una pagina web dove i ballerini si connettono per ricevere il flusso audio attraverso il proprio cellulare. È pensato per essere utilizzato tramite wifi, in loco per tutti i partecipanti.

Lo streaming server, realizzato con Node.js, legge la trasmissione azuracast e la propaga a tutti i client connessi, assicurandosi che ricevano tutti lo stesso istante della trasmissione simultaneamente.

Infatti, il client calcola il proprio ritardo dall'origine e regola in modo adattivo l'inizio del blocco successivo in modo che tutti i flussi tendano ad essere simultanei.
