---
title: rudp-tunnel
date: "2021-03-13T18:22:00.000Z"
description: An utility to upgrade an UDP stream to reliable UDP by mean of a tunnel relying on the Aeron driver.
coverImage: cover.jpg
language: en
category: libraries
links:
  - https://github.com/digitalillusion/rudp-tunnel
tags:
  - rust
---

An utility to upgrade an UDP stream to reliable UDP by mean of a tunnel relying on the Aeron driver. 

The command acts as a proxy between the origin and the destination of the initial, non-reliable UDP stream. 

**Example usage:**

IPX is a network layer protocol used by DOS games to play on LAN. Emulators like DOSBox provide an implementation over UDP of such protocol called IPXNET. However, since IPX on ethernet has a lower error rate than UDP on the internet, some games may not behave correctly in the presence, for instance, of packet loss.

rudp-tunnel can be used to provide a reliable connection for DOSBox IPXNET, allowing stable gameplay. Typically, IPXNET server binds a port on a given ip address (65.53.156.219 in the example) and the IPXNET clients can connect to such address. Instead, one would route the traffic through the local endpoints of the rudp-tunnel.