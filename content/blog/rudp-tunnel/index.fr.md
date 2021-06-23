---
title: rudp-tunnel
date: "2021-03-13T18:22:00.000Z"
description: Un utilitaire pour transformer un flux UDP en un UDP fiable au moyen d'un tunnel s'appuyant sur le pilote Aeron.
coverImage: cover.jpg
language: fr
category: libraries
links:
  - https://github.com/digitalillusion/rudp-tunnel
tags:
  - rust
---

Un utilitaire pour transformer un flux UDP en un UDP fiable au moyen d'un tunnel s'appuyant sur le pilote Aeron.

La commande agit comme un proxy entre l'origine et la destination du flux UDP initial non fiable.

**Exemple d'utilisation :**

IPX est un protocole de couche réseau utilisé par les jeux DOS pour jouer sur le réseau local. Des émulateurs comme DOSBox fournissent une implémentation sur UDP d'un tel protocole appelé IPXNET. Cependant, comme IPX sur Ethernet a un taux d'erreur inférieur à UDP sur Internet, certains jeux peuvent ne pas se comporter correctement en présence, par exemple, de perte de paquets.

rudp-tunnel peut être utilisé pour fournir une connexion fiable pour DOSBox IPXNET, permettant un gameplay stable. Typiquement, le serveur IPXNET lie un port à une adresse IP donnée et les clients IPXNET peuvent se connecter à cette adresse. Au lieu de cela, on achemine le trafic à travers les points de terminaison locaux du rudp-tunnel. 