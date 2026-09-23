# AYM·JS

## ABSTRACT

AYM·JS is a sound chip emulator written in JavaScript.

### DESCRIPTION

AYM·JS is designed to emulate these venerable and famous sound chips directly in your browser:

  - the AY-3-8910 PSG (Programmable Sound Generator)
  - the YM2149 SSG (Software-Controlled Sound Generator)

This project respects the [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle and is just based on the [Hugo static website generator](https://gohugo.io) and the `make` utility.

No `node`, `npm` or whatever... Just plain HTML, vanilla JavaScript, a hand-written CSS design system and [FontAwesome](https://fontawesome.com/).

Some old musics are shipped with this project. These musics are converted from the [ym file format](http://leonard.oxg.free.fr/ymformat.html) to JavaScript with a custom tool written in C++ which will be released later.

Custom playlists and support for the ym file format in the player are planned and will be added later to this project.

## SOURCES

The source code for the emulator itself is located in the following directory:

  - [src/static/vendor/aym-js/](src/static/vendor/aym-js/)

The emulator can be used in any project as long as the terms of the GPL-v2 license are respected.

## DEPENDENCIES

This project requires `hugo` v0.146.0 or higher and `make`.

On Linux based systems you just have to install the dependencies with your favorite package manager.

For example:

```
sudo apt install hugo make
```

## HOWTO

There is a `Makefile` to do most of the tasks. You just have to type `make` with the following targets.

### MAKE SERVE

The `make serve` command calls the `bin/hugo-serve.sh` script in order to starts the builtin webserver.

After running this command, open your web browser and go to [http://localhost:1313](http://localhost:1313).

Example:

```
make serve
```

### MAKE BUILD

The `make` or `make all` or `make build` command calls the `bin/hugo-build.sh` script in order to build the project.

After running this command, the `src/public` directory will contain the built project.

Example:

```
make
```

or

```
make all
```

or

```
make build
```

### MAKE CLEAN

The `make clean` command calls the `bin/hugo-clean.sh` script in order to clean the project.

After running this command, the `src/public` directory will be fully cleaned.

Example:

```
make clean
```

## LICENSE TERMS

### AYM·JS

This project is released under the terms of the General Public License version 2.

```
aym-js - Copyright (c) 2001-2026 - Olivier Poncet

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```

### FONTAWESOME

This project is distributed with [fontawesome](https://fontawesome.com/), an icon library and toolkit.

```
Font Awesome Free License

Font Awesome Free is free, open source, and GPL friendly. You can use it for
commercial projects, open source projects, or really almost whatever you want.
Full Font Awesome Free license: https://fontawesome.com/license/free.
```

### MUSICS

This project is distributed with some examples of musics.

```
Although they may be considered abandonware, the musics provided
with this package are protected under the copyrights of their authors.
```

