/*
 * main.js - Copyright (c) 2001-2026 - Olivier Poncet
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
// theme toggle
// ---------------------------------------------------------------------------

class ThemeManager {
    static STORAGE_KEY = "theme";
    static LIGHT = "light";
    static DARK  = "dark";

    constructor({ root = document.documentElement, storage = window.localStorage } = {}) {
        this.root = root;
        this.storage = storage;
    }

    getCurrent() {
        const attr = this.root.getAttribute("data-theme");
        if (attr === ThemeManager.LIGHT || attr === ThemeManager.DARK) {
            return attr;
        }
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? ThemeManager.DARK : ThemeManager.LIGHT;
    }

    set(theme) {
        this.root.setAttribute("data-theme", theme);
        try {
            this.storage.setItem(ThemeManager.STORAGE_KEY, theme);
        } catch (e) {
            /* localStorage indisponible : on ignore silencieusement. */
        }
    }

    toggle() {
        const next = this.getCurrent() === ThemeManager.DARK ? ThemeManager.LIGHT : ThemeManager.DARK;
        this.set(next);
    }

    bind(selector = ".theme-toggle") {
        document.querySelectorAll(selector).forEach((btn) => {
            btn.addEventListener("click", () => this.toggle());
        });
    }
}

const themeManager = new ThemeManager();
themeManager.bind();
window.toggleTheme = () => themeManager.toggle();

// ---------------------------------------------------------------------------
// mobile menu : fermeture automatique au clic sur un lien
// ---------------------------------------------------------------------------

document.querySelectorAll(".mobile-menu").forEach((menu) => {
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.removeAttribute("open");
        });
    });
});

// ---------------------------------------------------------------------------
// End-Of-File
// ---------------------------------------------------------------------------
