#!/bin/sh
#
# hugo-clean.sh - Copyright (c) 2001-2024 - Olivier Poncet
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

# ----------------------------------------------------------------------------
# some useful variables
# ----------------------------------------------------------------------------

prefix="$(pwd)"
bindir="${prefix}/bin"
srcdir="${prefix}/src"
pubdir="${prefix}/src/public"

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# move to sources
# ----------------------------------------------------------------------------

cd "${srcdir}"                                                       || exit 1

# ----------------------------------------------------------------------------
# clean
# ----------------------------------------------------------------------------

rm -rf "${pubdir}"                                                   || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
