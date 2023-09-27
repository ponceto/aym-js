/*
 * aym-synth-view.js - Copyright (c) 2001-2023 - Olivier Poncet
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
// Some useful constants
// ---------------------------------------------------------------------------

const AYM_CHIP0 = 0;
const AYM_CHIP1 = 1;

// ---------------------------------------------------------------------------
// AYM_SynthView
// ---------------------------------------------------------------------------

export class AYM_SynthView {
    constructor(controller) {
        this.controller = controller;
        this.aymDisplay = null;
        this.aymGain    = null;
        this.aymChip0   = null;
        this.aymMuteA   = null;
        this.aymMuteB   = null;
        this.aymMuteC   = null;
        this.aymChip1   = null;
        this.aymMuteD   = null;
        this.aymMuteE   = null;
        this.aymMuteF   = null;
        this.aymPower   = null;
        this.aymReset   = null;
        this.aymPause   = null;
        this.aymAnalyse = null;
        this.aymCanvas  = null;
        this.aymContext = null;
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
        this.enableGain();
        this.enableChip0();
        this.enableMuteA();
        this.enableMuteB();
        this.enableMuteC();
        this.enableChip1();
        this.enableMuteD();
        this.enableMuteE();
        this.enableMuteF();
        this.enableReset();
        this.enablePause();
        this.enableAnalyse();
        this.enableCanvas();
        this.setDisplay('AYM·Synth is On');
    }

    async powerOff() {
        this.disableCanvas();
        this.disableAnalyse();
        this.disablePause();
        this.disableReset();
        this.disableMuteF();
        this.disableMuteE();
        this.disableMuteD();
        this.disableChip1();
        this.disableMuteC();
        this.disableMuteB();
        this.disableMuteA();
        this.disableChip0();
        this.disableGain();
        this.setDisplay('AYM·Synth is Off');
    }

    bind() {
        this.bindDisplay();
        this.bindGain();
        this.bindChip0();
        this.bindMuteA();
        this.bindMuteB();
        this.bindMuteC();
        this.bindChip1();
        this.bindMuteD();
        this.bindMuteE();
        this.bindMuteF();
        this.bindPower();
        this.bindReset();
        this.bindPause();
        this.bindAnalyse();
        this.bindCanvas();
    }

    bindDisplay() {
        if(this.aymDisplay == null) {
            this.aymDisplay = this.getElementById('aymDisplay');
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

    bindChip0() {
        if(this.aymChip0 == null) {
            this.aymChip0 = this.getElementById('aymChip0');
            this.aymChip0.disabled = true;
            this.aymChip0.addEventListener('click', async () => { await this.controller.onClickChip0(); });
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

    bindChip1() {
        if(this.aymChip1 == null) {
            this.aymChip1 = this.getElementById('aymChip1');
            this.aymChip1.disabled = true;
            this.aymChip1.addEventListener('click', async () => { await this.controller.onClickChip1(); });
        }
    }

    bindMuteD() {
        if(this.aymMuteD == null) {
            this.aymMuteD = this.getElementById('aymMuteD');
            this.aymMuteD.disabled = true;
            this.aymMuteD.addEventListener('click', async () => { await this.controller.onClickMuteD(); });
        }
    }

    bindMuteE() {
        if(this.aymMuteE == null) {
            this.aymMuteE = this.getElementById('aymMuteE');
            this.aymMuteE.disabled = true;
            this.aymMuteE.addEventListener('click', async () => { await this.controller.onClickMuteE(); });
        }
    }

    bindMuteF() {
        if(this.aymMuteF == null) {
            this.aymMuteF = this.getElementById('aymMuteF');
            this.aymMuteF.disabled = true;
            this.aymMuteF.addEventListener('click', async () => { await this.controller.onClickMuteF(); });
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

    bindAnalyse() {
        if(this.aymAnalyse == null) {
            this.aymAnalyse = this.getElementById('aymAnalyse');
            this.aymAnalyse.disabled = true;
            this.aymAnalyse.addEventListener('click', async () => { await this.controller.onClickAnalyse(); });
        }
    }

    bindCanvas() {
        if(this.aymCanvas == null) {
            this.aymCanvas = this.getElementById('aymCanvas');
            this.aymCanvas.disabled = true;
            this.aymContext = this.aymCanvas.getContext('2d');
        }
    }

    enableGain() {
        this.enableElement(this.aymGain);
    }

    disableGain() {
        this.disableElement(this.aymGain);
    }

    enableChip0() {
        this.enableElement(this.aymChip0);
    }

    disableChip0() {
        this.disableElement(this.aymChip0);
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

    enableChip1() {
        this.enableElement(this.aymChip1);
    }

    disableChip1() {
        this.disableElement(this.aymChip1);
    }

    enableMuteD() {
        this.enableElement(this.aymMuteD);
    }

    disableMuteD() {
        this.disableElement(this.aymMuteD);
    }

    enableMuteE() {
        this.enableElement(this.aymMuteE);
    }

    disableMuteE() {
        this.disableElement(this.aymMuteE);
    }

    enableMuteF() {
        this.enableElement(this.aymMuteF);
    }

    disableMuteF() {
        this.disableElement(this.aymMuteF);
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

    enableAnalyse() {
        this.enableElement(this.aymAnalyse);
    }

    disableAnalyse() {
        if(this.aymAnalyse != null) {
            this.aymAnalyse.checked = false;
        }
        this.disableElement(this.aymAnalyse);
    }

    enableCanvas() {
        this.enableElement(this.aymCanvas);
    }

    disableCanvas() {
        this.disableElement(this.aymCanvas);
    }

    setPaused(chip_id) {
        if(this.aymPause != null) {
            this.aymPause.className = 'is-toggled';
        }
        if((chip_id == AYM_CHIP0) && (this.aymChip0 != null)) {
            this.aymChip0.className = 'is-toggled';
        }
        if((chip_id == AYM_CHIP1) && (this.aymChip1 != null)) {
            this.aymChip1.className = 'is-toggled';
        }
    }

    setResumed(chip_id) {
        if(this.aymPause != null) {
            this.aymPause.className = '';
        }
        if((chip_id == AYM_CHIP0) && (this.aymChip0 != null)) {
            this.aymChip0.className = '';
        }
        if((chip_id == AYM_CHIP1) && (this.aymChip1 != null)) {
            this.aymChip1.className = '';
        }
    }

    setMutedA(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteA != null)) {
            this.aymMuteA.className = 'is-toggled';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteD != null)) {
            this.aymMuteD.className = 'is-toggled';
        }
    }

    setUnmutedA(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteA != null)) {
            this.aymMuteA.className = '';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteD != null)) {
            this.aymMuteD.className = '';
        }
    }

    setMutedB(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteB != null)) {
            this.aymMuteB.className = 'is-toggled';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteE != null)) {
            this.aymMuteE.className = 'is-toggled';
        }
    }

    setUnmutedB(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteB != null)) {
            this.aymMuteB.className = '';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteE != null)) {
            this.aymMuteE.className = '';
        }
    }

    setMutedC(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteC != null)) {
            this.aymMuteC.className = 'is-toggled';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteF != null)) {
            this.aymMuteF.className = 'is-toggled';
        }
    }

    setUnmutedC(chip_id) {
        if((chip_id == AYM_CHIP0) && (this.aymMuteC != null)) {
            this.aymMuteC.className = '';
        }
        if((chip_id == AYM_CHIP1) && (this.aymMuteF != null)) {
            this.aymMuteF.className = '';
        }
    }

    setDisplay(message) {
        this.setInnerText(this.aymDisplay, message);
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

    render() {
        const analyser = this.controller.model.waAnalyser;
        const canvas   = this.aymCanvas;
        const context  = this.aymContext;
        let   data     = null;

        const draw = () => {
            const width   = canvas.width;
            const height  = canvas.height;
            const enabled = this.aymAnalyse.checked;

            if(enabled != false) {
                analyser.getByteFrequencyData(data);
                context.fillStyle = '#f8f8f8';
                context.fillRect(0, 0, width, height);
                context.fillStyle = '#ff6d6a';
                const count = data.length;
                const bw = (width / count);
                for(let index = 0; index < count; index++) {
                    const value = data[index];
                    const bh = ((value * height) / 255);
                    const bx = (index * bw);
                    const by = (height - bh);
                    context.fillRect(bx, by, bw, bh);
                }
                requestAnimationFrame(draw);
            }
            else {
                context.clearRect(0, 0, width, height);
            }
        };

        if((analyser != null) && (canvas != null) && (context != null)) {
            const enabled = this.aymAnalyse.checked;
            if(enabled != false) {
                analyser.fftSize = 1024;
                data = new Uint8Array(analyser.frequencyBinCount);
                requestAnimationFrame(draw);
            }
        }
    }
}

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
