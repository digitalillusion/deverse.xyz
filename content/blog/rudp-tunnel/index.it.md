---
title: rudp-tunnel
date: "2021-03-13T18:22:00.000Z"
description: Un'utilità per trasformare un flusso UDP in UDP affidabile tramite un tunnel basato sul driver Aeron.
coverImage: cover.jpg
language: it
category: libraries
links:
  - https://github.com/digitalillusion/rudp-tunnel
tags:
  - rust
---

Un'utilità per trasformare un flusso UDP in UDP affidabile tramite un tunnel basato sul driver Aeron.

Il comando funge da proxy tra l'origine e la destinazione del flusso UDP iniziale e non affidabile.

**Esempio di utilizzo:**

IPX è un protocollo di livello di rete utilizzato dai giochi DOS per giocare su LAN. Emulatori come DOSBox forniscono un'implementazione su UDP di tale protocollo chiamato IPXNET. Tuttavia, poiché IPX su Ethernet ha un tasso di errore inferiore rispetto a UDP su Internet, alcuni giochi potrebbero non comportarsi correttamente in presenza, ad esempio, di perdita di pacchetti.

rudp-tunnel può essere utilizzato per fornire una connessione affidabile per DOSBox IPXNET, consentendo un gioco stabile. In genere, il server IPXNET associa una porta su un determinato indirizzo IP e i client IPXNET possono connettersi a tale indirizzo. Invece di fare ciò, si indirizza il traffico attraverso gli endpoint locali del rudp-tunnel.
