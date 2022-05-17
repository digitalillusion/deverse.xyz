---
title: silentdisco
date: "2019-03-21T12:30:00.000Z"
description: Un service de synchronisation temporelle de flux audio qui peut être utilisé pour faire la fête.
coverImage: cover.jpg
language: fr
category: mobileapps
links:
  - https://github.com/digitalillusion/silentdisco
tags:
  - javascript
  - nodejs
  - docker
---

Un service de synchronisation temporelle de flux audio qui peut être utilisé pour faire la fête.

Prototype de discothèque silencieuse, construit sur deux éléments : la station de radio (qui utilise azuracast) et une page web où les danseurs se connectent pour recevoir le flux audio via leur téléphone portable. Il est destiné à être utilisé en wifi, sur place pour tous les participants.

Le serveur de streaming, réalisé avec Node.js, lit la transmission azuracast et la propage à tous les clients connectés, en s'assurant qu'ils reçoivent tous le même instant de la transmission en même temps.

En fait, le client calcule son retard à partir de la source et ajuste de manière adaptative le début du prochain tronçon de sorte que tous les flux aient tendance à être simultanés.
