---
title: silentdisco
date: "2019-03-21T12:30:00.000Z"
description: An audio-stream time-synchronization service that can be used to party.
coverImage: cover.jpg
language: en
category: mobileapps
links:
  - https://github.com/digitalillusion/silentdisco
tags:
  - javascript
  - nodejs
  - docker
---

An audio-stream time-synchronization service that can be used to party.

Prototype of silent discotheque, built on two components: the radio station (which uses azuracast) and a webpage where dancers connect to receive the audio stream through their mobile phone. It's intended to be used through wifi, on site for all participants.

The streaming server, made with Node.js, reads the azuracast transmission and propagates it to all connected clients, making sure that they all receive the same instant of the transmission at the same time.

Infact, the client computes its delay from the source and adaptively adjust the start of the next chunk so that all streams tend to be simultaneous.
