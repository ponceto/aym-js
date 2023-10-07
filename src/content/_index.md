---
title: "AYM·JS • A soundchip emulator written in JavaScript"
date: 2023-09-13T12:00:00+02:00
lastmod: 2023-09-30T12:00:00+02:00
author: Olivier Poncet
categories: ["Pages"]
tags: ["Page", "Home", "Player", "Synth"]
draft: false
---
AYM·JS is a sound chip emulator written in JavaScript and designed to emulate the [AY-3-8910 PSG]({{< ref "/about.md" >}}#the-ay-3-8910) (Programmable Sound Generator) and the [YM2149 SSG]({{< ref "/about.md" >}}#the-ym2149) (Software-Controlled Sound Generator).

### The player

AYM·Player is a [AY-3-8910 / YM2149]({{< ref "/about.md" >}}) music player. It is based on the AYM·JS emulator and the [Web Audio API](https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API).

You can have more informations on the [player page]({{< ref "/player.md" >}}).

{{< player >}}

### The synthetizer

AYM·Synth is a virtual [AY-3-8910 / YM2149]({{< ref "/about.md" >}}) synthesizer. It is based on the AYM·JS emulator, the [Web Audio API](https://developer.mozilla.org/fr/docs/Web/API/Web_Audio_API) and the [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).

You can have more informations on the [synthetizer page]({{< ref "/synth.md" >}}).

