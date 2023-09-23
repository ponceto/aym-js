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
import { AYM_SynthMIDI  } from './aym-synth-midi.js';

// ---------------------------------------------------------------------------
// AYM_Synth
// ---------------------------------------------------------------------------

export class AYM_Synth {
    constructor() {
        this.model  = new AYM_SynthModel(this);
        this.view   = new AYM_SynthView(this);
        this.midi   = new AYM_SynthMIDI(this);
        this.voices = [-1, -1, -1];
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
        this.voices.fill(-1);
        this.model.sendReset();
    }

    async onClickPause() {
        this.model.sendPause();
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

    midiNoteOn(channel, note, velocity)
    {
        let voice = this.voices.findIndex((entry) => {
            return entry == note;
        });
        if(voice < 0) {
            voice = this.voices.findIndex((entry) => {
                return entry == -1;
            });
        }
        if(voice >= 0) {
            this.voices[voice] = note;
            const frequency = this.midi.convertNoteToFrequency(note);
            const amplitude = this.midi.convertVelocityToAmplitude(velocity);
            this.model.sendNoteOn(voice, ((frequency | 0) >> 0), ((amplitude | 0) >> 3));
        }
    }

    midiNoteOff(channel, note, velocity)
    {
        let voice = this.voices.findIndex((entry) => {
            return entry == note;
        });
        if(voice >= 0) {
            this.voices[voice] = -1;
            const frequency = 0;
            const amplitude = 0;
            this.model.sendNoteOff(voice, (frequency >> 0), (amplitude >> 3));
        }
    }
}

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
