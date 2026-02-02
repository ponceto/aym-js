#!/bin/sh
#
# hugo-deploy.sh - Copyright (c) 2001-2025 - Olivier Poncet
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

curdir="$(pwd)"
srcdir="${curdir}/src"
pubdir="${srcdir}/public"

# ----------------------------------------------------------------------------
# some useful variables
# ----------------------------------------------------------------------------

SSH='ssh'
SSH_OPTS='-t'
SSH_HOSTS='aym-js-emaxilde-net'
SSH_CMD='/usr/local/bin/deploy-aym-js.sh'

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# deploy
# ----------------------------------------------------------------------------

for SSH_HOST in ${SSH_HOSTS}
do
    ${SSH} ${SSH_OPTS} "${SSH_HOST}" "${SSH_CMD}"                    || exit 1
done

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
