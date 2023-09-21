/*
 * aym-synth.js - Copyright (c) 2001-2023 - Olivier Poncet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { AYM_SynthModel } from './aym-synth-model.js';
import { AYM_SynthView  } from './aym-synth-view.js';

// ---------------------------------------------------------------------------
// MIDI notes/frequency conversion table
// ---------------------------------------------------------------------------

const MIDI_NOTES = [,
        8.176,
        8.662,
        9.177,
        9.723,
       10.301,
       10.913,
       11.562,
       12.250,
       12.978,
       13.750,
       14.568,
       15.434,
       16.352,
       17.324,
       18.354,
       19.445,
       20.602,
       21.827,
       23.125,
       24.500,
       25.957,
       27.500,
       29.135,
       30.868,
       32.703,
       34.648,
       36.708,
       38.891,
       41.203,
       43.654,
       46.249,
       48.999,
       51.913,
       55.000,
       58.270,
       61.735,
       65.406,
       69.296,
       73.416,
       77.782,
       82.407,
       87.307,
       92.499,
       97.999,
      103.826,
      110.000,
      116.541,
      123.471,
      130.813,
      138.591,
      146.832,
      155.563,
      164.814,
      174.614,
      184.997,
      195.998,
      207.652,
      220.000,
      233.082,
      246.942,
      261.626,
      277.183,
      293.665,
      311.127,
      329.628,
      349.228,
      369.994,
      391.995,
      415.305,
      440.000,
      466.164,
      493.883,
      523.251,
      554.365,
      587.330,
      622.254,
      659.255,
      698.456,
      739.989,
      783.991,
      830.609,
      880.000,
      932.328,
      987.767,
     1046.502,
     1108.731,
     1174.659,
     1244.508,
     1318.510,
     1396.913,
     1479.978,
     1567.982,
     1661.219,
     1760.000,
     1864.655,
     1975.533,
     2093.005,
     2217.461,
     2349.318,
     2489.016,
     2637.020,
     2793.826,
     2959.955,
     3135.963,
     3322.438,
     3520.000,
     3729.310,
     3951.066,
     4186.009,
     4434.922,
     4698.636,
     4978.032,
     5274.041,
     5587.652,
     5919.911,
     6271.927,
     6644.875,
     7040.000,
     7458.620,
     7902.133,
     8372.018,
     8869.844,
     9397.273,
     9956.063,
    10548.080,
    11175.300,
    11839.820,
    12543.850,
];

// ---------------------------------------------------------------------------
// AYM_SynthMIDI
// ---------------------------------------------------------------------------

export class AYM_SynthMIDI {
    constructor(listener) {
        this.listener = listener;
        this.inputs   = null;
        this.outputs  = null;
    }

    async powerOn() {
        if((this.inputs == null) && (this.outputs == null)) {
            navigator.requestMIDIAccess().then(
                (midi) => { this.onSuccess(midi) },
                (midi) => { this.onFailure(midi) }
            );
        }
    }

    async powerOff() {
    }

    onSuccess(midi)
    {
        const registerInput = (input) => {
            console.log('MIDI-In', input);
            input.onmidimessage = (message) => {
                this.onMessage(message);
            };
        };

        const registerOutput = (output) => {
            console.log('MIDI-Out', output);
        };

        const getInputs = () => {
            const inputs = midi.inputs;
            inputs.forEach((input) => {
                if(input.name.startsWith('Midi Through') == false) {
                    registerInput(input);
                }
            });
            return inputs;
        };

        const getOutputs = () => {
            const outputs = midi.outputs;
            outputs.forEach((output) => {
                if(output.name.startsWith('Midi Through') == false) {
                    registerOutput(output);
                }
            });
            return outputs;
        };

        this.inputs  = getInputs();
        this.outputs = getOutputs();
    }

    onFailure(midi)
    {
        console.log('WebMIDI is not supported in this browser.');
    }

    onMessage(message)
    {
        const type = message.data[0];
        if((type & 0xf0) == 0x90) {
            const channel  = (type & 0x0f);
            const note     = message.data[1];
            const velocity = message.data[2];
            if(velocity == 0) {
                this.listener.onNoteOff(channel, note, 127);
                return;
            }
            this.listener.onNoteOn(channel, note, velocity);
            return;
        }
        if((type & 0xf0) == 0x80) {
            const channel  = (type & 0x0f);
            const note     = message.data[1];
            const velocity = message.data[2];
            this.listener.onNoteOff(channel, note, velocity);
            return;
        }
    }
}

// ---------------------------------------------------------------------------
// AYM_Synth
// ---------------------------------------------------------------------------

export class AYM_Synth {
    constructor() {
        this.model = new AYM_SynthModel(this);
        this.view  = new AYM_SynthView(this);
        this.midi  = new AYM_SynthMIDI(this);
        this.voice = [-1, -1, -1];
    }

    async onLoadWindow() {
        this.view.bind();
    }

    async onInputGain() {
        const gain = this.view.getGainValue();
        this.model.setGain(gain);
    }

    async onClickMuteA() {
        this.model.sendMuteA();
    }

    async onClickMuteB() {
        this.model.sendMuteB();
    }

    async onClickMuteC() {
        this.model.sendMuteC();
    }

    async onClickPower() {
        if(this.model.isNotPowered()) {
            await this.model.powerOn();
            await this.view.powerOn();
            await this.midi.powerOn();
        }
        else {
            await this.midi.powerOff();
            await this.view.powerOff();
            await this.model.powerOff();
        }
    }

    async onClickReset() {
        this.model.sendReset();
    }

    async onClickPause() {
        this.model.sendPause();
    }

    getVoice(note) {
        const count = this.voice.length;
        for(let index = 0; index < count; ++index) {
            if(this.voice[index] == note) {
                return index;
            }
        }
        return -1;
    }

    async onNoteOn(channel, note, velocity)
    {
        const voice = this.getVoice(-1);
        if(voice >= 0) {
            this.voice[voice] = note;
            this.model.sendNoteOn(voice, (MIDI_NOTES[note] | 0), (velocity >> 3));
        }
    }

    async onNoteOff(channel, note, velocity)
    {
        const voice = this.getVoice(note);
        if(voice >= 0) {
            this.voice[voice] = -1;
            this.model.sendNoteOff(voice, (MIDI_NOTES[note] | 0), (velocity >> 3));
        }
    }

    async recvPaused() {
        this.view.setPaused();
    }

    async recvResumed() {
        this.view.setResumed();
    }

    async recvMutedA() {
        this.view.setMutedA();
    }

    async recvUnmutedA() {
        this.view.setUnmutedA();
    }

    async recvMutedB() {
        this.view.setMutedB();
    }

    async recvUnmutedB() {
        this.view.setUnmutedB();
    }

    async recvMutedC() {
        this.view.setMutedC();
    }

    async recvUnmutedC() {
        this.view.setUnmutedC();
    }
}

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
