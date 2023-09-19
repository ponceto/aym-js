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
// AYM_Synth
// ---------------------------------------------------------------------------

export class AYM_Synth {
    constructor() {
        this.model = new AYM_SynthModel(this);
        this.view  = new AYM_SynthView(this);
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
        }
        else {
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
