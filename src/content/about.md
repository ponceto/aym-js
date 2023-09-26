---
title: "About the AY-3-8910 and the YM2149"
date: 2023-09-21T12:00:00+02:00
lastmod: 2023-09-25T12:00:00+02:00
author: Olivier Poncet
images: ["/assets/images/aym-js-banner.jpg"]
draft: false
---
## ABOUT

### The AY-3-8910

The AY-3-8910 is a Programmable Sound Generator (PSG) integrated circuit that was commonly used in various home computers and video game systems during the late 1970s and 1980s. It was manufactured by General Instrument and was known for its ability to produce simple audio tones and noise, making it suitable for generating music and sound effects in early video games and computer systems.

![AY-3-8910 die](/assets/images/ay-3-8910-die.jpg)

Here are the key features of the AY-3-8910:

  - Three sound channels: The AY-3-8910 has three sound channels, each capable of generating square wave tones with different frequencies.
  - Noise generator: The AY-3-8910 has a noise generator Each channel can share the noise generator, thus allowing the creation of various types of sound effects.
  - Envelopes generator: The AY-3-8910 has one envelope generator. Each channel can share the envelope generator, thus allowing the creation of more complex musical notes and sound effects.
  - Programmability: The AY-3-8910 is programmable, which meant that software could control the frequency, the volume, and other parameters of the sound channels in real-time, enabling a wide range of audio effects.
  - I/O ports: The AY-3-8910 has two general purpose bidirectional 8-bit I/O ports, that can be used to connect external devices like keyboards, jousticks, etc.

It was declined in 3 different versions:

  - AY-3-8910, with two I/O ports.
  - AY-3-8912, with one I/O ports.
  - AY-3-8913, with no I/O ports.

The AY-3-8910 played a significant role in the early days of video game music and audio. Composers and programmers used its capabilities to create memorable tunes and sound effects in many classic games. While it has largely been replaced by more advanced sound chips in modern electronics, it remains a nostalgic and iconic component of early computer and gaming history.

It was commonly interfaced with microcontrollers and computers of the era, such as the ZX Spectrum, Amstrad CPC, and various arcade machines.

### The YM2149

The YM2149 is a Software-Controlled Sound Generator (SSG) integrated circuit and is basically the same chip as the AY-3-8910. Il was produced under licence by Yamaha Music with some minor differences and improvements.

The main difference is essentially on the envelope generator which internally uses a 5 bits counter instead of 4 bits counter on the AY-3-8910, allowing a smoother volume ramping. This results in twice the steps and then counts up twice as fast, but you can adjust the clock divider by dividing it by two by wiring the /SEL pin to the ground. The other difference is that on the AY, unused bits in registers always read as 0 even if you had written 1 to them before, but on the YM, the register values can be read back as written.

Much like the AY-3-8910, the YM2149 played a significant role in early video game music and sound effects, contributing to the nostalgia and iconic sound of that era.

It was commonly used in home computers like the Atari ST and was also used in some arcade machines and video game consoles.

### Internal block diagram

The AY-3-8910 / YM2149 is basically a state machine with a few simple functional blocks consisting of counters, comparators and some fairly simple logic.

![Internal block diagram](/assets/images/internal-block-diagram.png)

### Internal control registers

The AY-3-8910 / YM2149 is controlled via 16 internal registers. Each of the 16 registers is also readable so that the microprocessor can determine current state or stored data values. Only one register is accessible at a time using a register latch.

![Internal control registers](/assets/images/internal-control-registers.png)

