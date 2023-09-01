/*
 * aym-emulator-adapter.js - Copyright (c) 2001-2023 - Olivier Poncet
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

import { AYM_Utils    } from './aym-utils.js';
import { AYM_Emulator } from './aym-emulator.js';

// ---------------------------------------------------------------------------
// AYM_EmulatorAdapter
// ---------------------------------------------------------------------------

export class AYM_EmulatorAdapter {
    constructor(emulator) {
        this.emulator = emulator;
    }

    set_tone0_period(period) {
        const min_period = 0;
        const max_period = 4095;
        const cur_period = AYM_Utils.clamp_int(period, min_period, max_period) | 0;
        this.set_register(0, ((cur_period >> 0) & 0xff));
        this.set_register(1, ((cur_period >> 8) & 0xff));
    }

    set_tone1_period(period) {
        const min_period = 0;
        const max_period = 4095;
        const cur_period = AYM_Utils.clamp_int(period, min_period, max_period) | 0;
        this.set_register(2, ((cur_period >> 0) & 0xff));
        this.set_register(3, ((cur_period >> 8) & 0xff));
    }

    set_tone2_period(period) {
        const min_period = 0;
        const max_period = 4095;
        const cur_period = AYM_Utils.clamp_int(period, min_period, max_period) | 0;
        this.set_register(4, ((cur_period >> 0) & 0xff));
        this.set_register(5, ((cur_period >> 8) & 0xff));
    }

    set_noise_period(period) {
        const min_period = 0;
        const max_period = 31;
        const cur_period = AYM_Utils.clamp_int(period, min_period, max_period) | 0;
        this.set_register(6, ((cur_period >> 0) & 0xff));
    }

    set_tone0_frequency(frequency) {
        let period = 0;
        if(frequency > 0) {
            period = (this.emulator.master_clock / (16 * frequency));
        }
        this.set_tone0_period(period);
    }

    set_tone1_frequency(frequency) {
        let period = 0;
        if(frequency > 0) {
            period = (this.emulator.master_clock / (16 * frequency));
        }
        this.set_tone1_period(period);
    }

    set_tone2_frequency(frequency) {
        let period = 0;
        if(frequency > 0) {
            period = (this.emulator.master_clock / (16 * frequency));
        }
        this.set_tone2_period(period);
    }

    set_noise_frequency(frequency) {
        let period = 0;
        if(frequency > 0) {
            period = (this.emulator.master_clock / (16 * frequency));
        }
        this.set_noise_period(period);
    }

    get_register(reg_index, reg_value) {
        this.emulator.set_register_index(reg_index);

        return this.emulator.get_register_value(reg_value);
    }

    set_register(reg_index, reg_value) {
        this.emulator.set_register_index(reg_index);

        return this.emulator.set_register_value(reg_value);
    }
}

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
