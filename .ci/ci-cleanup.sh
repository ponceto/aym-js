#!/bin/sh
#
# ci-cleanup.sh - Copyright (c) 2001-2026 - Olivier Poncet
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
# no debug
# ----------------------------------------------------------------------------

set +x

# ----------------------------------------------------------------------------
# import config
# ----------------------------------------------------------------------------

. ".ci/ci-config.sh"                                                 || exit 1

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# clean
# ----------------------------------------------------------------------------

make clean                                                           || exit 1

# ----------------------------------------------------------------------------
# move to sources
# ----------------------------------------------------------------------------

cd "${arg_srcdir}"                                                   || exit 1

# ----------------------------------------------------------------------------
# clean archive
# ----------------------------------------------------------------------------

rm -f "${arg_prefix}/${arg_basename}.tar.gz"                         || exit 1

# ----------------------------------------------------------------------------
# clean package
# ----------------------------------------------------------------------------

rm -f "${arg_prefix}/${arg_basename}"_*_all.deb                      || exit 1
rm -f "${arg_prefix}/${arg_basename}"_*.buildinfo                    || exit 1
rm -f "${arg_prefix}/${arg_basename}"_*.changes                      || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
