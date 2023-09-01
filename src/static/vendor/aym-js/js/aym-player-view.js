/*
 * aym-player-view.js - Copyright (c) 2001-2023 - Olivier Poncet
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

import { AYM_Utils } from './aym-utils.js';

// ---------------------------------------------------------------------------
// AYM_PlayerView
// ---------------------------------------------------------------------------

export class AYM_PlayerView {
    constructor(controller) {
        this.controller = controller;
        this.aymTitle   = null;
        this.aymPlay    = null;
        this.aymStop    = null;
        this.aymPrev    = null;
        this.aymNext    = null;
        this.aymSeek    = null;
        this.aymGain    = null;
        this.aymMuteA   = null;
        this.aymMuteB   = null;
        this.aymMuteC   = null;
        this.aymPower   = null;
        this.aymReset   = null;
        this.aymPause   = null;
        window.addEventListener('load', async () => { await this.controller.onLoadWindow(); });
    }

    getElementById(id) {
        const element = document.getElementById(id);
        if(element == null) {
            throw new Error('element <' + id + '> was not found');
        }
        return element;
    }

    enableElement(element) {
        if(element != null) {
            element.disabled = false;
        }
    }

    disableElement(element) {
        if(element != null) {
            element.disabled = true;
        }
    }

    setInnerText(element, text) {
        if(element != null) {
            element.innerText = text;
        }
    }

    async powerOn() {
        this.enablePlay();
        this.disableStop();
        this.enablePrev();
        this.enableNext();
        this.enableSeek();
        this.enableGain();
        this.enableMuteA();
        this.enableMuteB();
        this.enableMuteC();
        this.enableReset();
        this.enablePause();
        this.setTitle('AYM Player is On');
    }

    async powerOff() {
        this.disablePause();
        this.disableReset();
        this.disableMuteC();
        this.disableMuteB();
        this.disableMuteA();
        this.disableGain();
        this.disableSeek();
        this.disableNext();
        this.disablePrev();
        this.disableStop();
        this.disablePlay();
        this.setTitle('AYM Player is Off');
    }

    bind() {
        this.bindTitle();
        this.bindPlay();
        this.bindStop();
        this.bindPrev();
        this.bindNext();
        this.bindSeek();
        this.bindGain();
        this.bindMuteA();
        this.bindMuteB();
        this.bindMuteC();
        this.bindPower();
        this.bindReset();
        this.bindPause();
    }

    bindTitle() {
        if(this.aymTitle == null) {
            this.aymTitle = this.getElementById('aymTitle');
        }
    }

    bindPlay() {
        if(this.aymPlay == null) {
            this.aymPlay = this.getElementById('aymPlay');
            this.aymPlay.disabled = true;
            this.aymPlay.addEventListener('click', async () => { await this.controller.onClickPlay(); });
        }
    }

    bindStop() {
        if(this.aymStop == null) {
            this.aymStop = this.getElementById('aymStop');
            this.aymStop.disabled = true;
            this.aymStop.addEventListener('click', async () => { await this.controller.onClickStop(); });
        }
    }

    bindPrev() {
        if(this.aymPrev == null) {
            this.aymPrev = this.getElementById('aymPrev');
            this.aymPrev.disabled = true;
            this.aymPrev.addEventListener('click', async () => { await this.controller.onClickPrev(); });
        }
    }

    bindNext() {
        if(this.aymNext == null) {
            this.aymNext = this.getElementById('aymNext');
            this.aymNext.disabled = true;
            this.aymNext.addEventListener('click', async () => { await this.controller.onClickNext(); });
        }
    }

    bindSeek() {
        if(this.aymSeek == null) {
            this.aymSeek = this.getElementById('aymSeek');
            this.aymSeek.disabled = true;
            this.aymSeek.min = 0;
            this.aymSeek.max = 1000;
            this.aymSeek.value = 0;
            this.aymSeek.addEventListener('input', async () => { await this.controller.onInputSeek(); });
        }
    }

    bindGain() {
        if(this.aymGain == null) {
            this.aymGain = this.getElementById('aymGain');
            this.aymGain.disabled = true;
            this.aymGain.min = 0;
            this.aymGain.max = 1000;
            this.aymGain.value = 500;
            this.aymGain.addEventListener('input', async () => { await this.controller.onInputGain(); });
        }
    }

    bindMuteA() {
        if(this.aymMuteA == null) {
            this.aymMuteA = this.getElementById('aymMuteA');
            this.aymMuteA.disabled = true;
            this.aymMuteA.addEventListener('click', async () => { await this.controller.onClickMuteA(); });
        }
    }

    bindMuteB() {
        if(this.aymMuteB == null) {
            this.aymMuteB = this.getElementById('aymMuteB');
            this.aymMuteB.disabled = true;
            this.aymMuteB.addEventListener('click', async () => { await this.controller.onClickMuteB(); });
        }
    }

    bindMuteC() {
        if(this.aymMuteC == null) {
            this.aymMuteC = this.getElementById('aymMuteC');
            this.aymMuteC.disabled = true;
            this.aymMuteC.addEventListener('click', async () => { await this.controller.onClickMuteC(); });
        }
    }

    bindPower() {
        if(this.aymPower == null) {
            this.aymPower = this.getElementById('aymPower');
            this.aymPower.disabled = false;
            this.aymPower.addEventListener('click', async () => { await this.controller.onClickPower(); });
        }
    }

    bindReset() {
        if(this.aymReset == null) {
            this.aymReset = this.getElementById('aymReset');
            this.aymReset.disabled = true;
            this.aymReset.addEventListener('click', async () => { await this.controller.onClickReset(); });
        }
    }

    bindPause() {
        if(this.aymPause == null) {
            this.aymPause = this.getElementById('aymPause');
            this.aymPause.disabled = true;
            this.aymPause.addEventListener('click', async () => { await this.controller.onClickPause(); });
        }
    }

    enablePlay() {
        this.enableElement(this.aymPlay);
    }

    disablePlay() {
        this.disableElement(this.aymPlay);
    }

    enableStop() {
        this.enableElement(this.aymStop);
    }

    disableStop() {
        this.disableElement(this.aymStop);
    }

    enablePrev() {
        this.enableElement(this.aymPrev);
    }

    disablePrev() {
        this.disableElement(this.aymPrev);
    }

    enableNext() {
        this.enableElement(this.aymNext);
    }

    disableNext() {
        this.disableElement(this.aymNext);
    }

    enableSeek() {
        this.enableElement(this.aymSeek);
    }

    disableSeek() {
        this.disableElement(this.aymSeek);
    }

    enableGain() {
        this.enableElement(this.aymGain);
    }

    disableGain() {
        this.disableElement(this.aymGain);
    }

    enableMuteA() {
        this.enableElement(this.aymMuteA);
    }

    disableMuteA() {
        this.disableElement(this.aymMuteA);
    }

    enableMuteB() {
        this.enableElement(this.aymMuteB);
    }

    disableMuteB() {
        this.disableElement(this.aymMuteB);
    }

    enableMuteC() {
        this.enableElement(this.aymMuteC);
    }

    disableMuteC() {
        this.disableElement(this.aymMuteC);
    }

    enablePower() {
        this.enableElement(this.aymPower);
    }

    disablePower() {
        this.disableElement(this.aymPower);
    }

    enableReset() {
        this.enableElement(this.aymReset);
    }

    disableReset() {
        this.disableElement(this.aymReset);
    }

    enablePause() {
        this.enableElement(this.aymPause);
    }

    disablePause() {
        this.disableElement(this.aymPause);
    }

    setPlaying() {
        this.disablePlay();
        this.enableStop();
    }

    setStopped() {
        this.disableStop();
        this.enablePlay();
    }

    setChanged() {
    }

    setUnchanged() {
    }

    setMutedA() {
        if(this.aymMuteA != null) {
            this.aymMuteA.className = 'is-toggled';
        }
    }

    setUnmutedA() {
        if(this.aymMuteA != null) {
            this.aymMuteA.className = '';
        }
    }

    setMutedB() {
        if(this.aymMuteB != null) {
            this.aymMuteB.className = 'is-toggled';
        }
    }

    setUnmutedB() {
        if(this.aymMuteB != null) {
            this.aymMuteB.className = '';
        }
    }

    setMutedC() {
        if(this.aymMuteC != null) {
            this.aymMuteC.className = 'is-toggled';
        }
    }

    setUnmutedC() {
        if(this.aymMuteC != null) {
            this.aymMuteC.className = '';
        }
    }

    setPaused() {
        if(this.aymPause != null) {
            this.aymPause.className = 'is-toggled';
        }
    }

    setResumed() {
        if(this.aymPause != null) {
            this.aymPause.className = '';
        }
    }

    setTitle(title) {
        this.setInnerText(this.aymTitle, title);
    }

    setSeekValue(seek) {
        const val = ((seek * 1000.0) | 0);
        const min = 0;
        const max = 1000;
        if(this.aymSeek != null) {
            this.aymSeek.value = AYM_Utils.clamp_int(val, min, max);
        }
    }

    getSeekValue() {
        let   val = 0;
        const min = 0;
        const max = 1000;
        if(this.aymSeek != null) {
            val = (this.aymSeek.value | 0);
        }
        return AYM_Utils.clamp_int(val, min, max) / +max;
    }

    getGainValue() {
        let   val = 0;
        const min = 0;
        const max = 1000;
        if(this.aymGain != null) {
            val = (this.aymGain.value | 0);
        }
        return AYM_Utils.clamp_int(val, min, max) / +max;
    }
}

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
