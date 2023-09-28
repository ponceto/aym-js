/*
 * index.js - Copyright (c) 2001-2023 - Olivier Poncet
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

// ---------------------------------------------------------------------------
// ThemeSwitcher constants
// ---------------------------------------------------------------------------

const THEME_AUTO  = 'auto';
const THEME_DARK  = 'dark';
const THEME_LIGHT = 'light';

// ---------------------------------------------------------------------------
// ThemeSwitcher
// ---------------------------------------------------------------------------

export class ThemeSwitcher {
    constructor(storage) {
        this.node_selector = 'html';
        this.node_property = 'data-theme';
        this.storage       = localStorage;
        this.storage_key   = 'theme';
        this.theme         = null;
        this.switcher      = document.getElementById('theme-switcher');
        if(this.switcher != null) {
            this.switcher.addEventListener('click', async () => { this.toggleTheme(); });
        }
        this.setTheme(this.saveTheme(this.loadTheme()));
    }

    loadTheme() {
        if(this.storage != null) {
            this.theme = this.storage.getItem(this.storage_key);
        }
        if(this.theme == null) {
            this.theme = THEME_AUTO;
        }
        return this.theme;
    }

    saveTheme() {
        if(this.theme == null) {
            this.theme = THEME_AUTO;
        }
        if(this.storage != null) {
            this.storage.setItem(this.storage_key, this.theme);
        }
        return this.theme;
    }

    setTheme(theme) {
        if(theme != null) {
            this.theme = theme;
        }
        if(this.theme != null) {
            document.querySelector(this.node_selector).setAttribute(this.node_property, this.theme);
        }
        return this.theme;
    }

    setDarkTheme() {
        this.setTheme(THEME_DARK);
        return this.saveTheme();
    }

    setLightTheme() {
        this.setTheme(THEME_LIGHT);
        return this.saveTheme();
    }

    toggleTheme() {
        switch(this.theme) {
            case THEME_DARK:
                return this.setLightTheme();
            case THEME_LIGHT:
                return this.setDarkTheme();
            default:
                break;
        }
        return this.setLightTheme();
    }
}

// ---------------------------------------------------------------------------
// gThemeSwitcher
// ---------------------------------------------------------------------------

const gThemeSwitcher = new ThemeSwitcher();

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
