#!/bin/sh
#
# ci-setup-debian.sh - Copyright (c) 2001-2026 - Olivier Poncet
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
# some useful variables
# ----------------------------------------------------------------------------

apt_update='yes'
apt_dist_upgrade='yes'
apt_install_packages='yes'
apt_install_hugo='yes'
apt_autoremove='yes'
apt_clean='yes'

apt_packages="
build-essential
devscripts
debhelper
fakeroot
dh-make
dh-exec
equivs
openssh-client
wget
"

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# debian specific variables
# ----------------------------------------------------------------------------

export DEBIAN_FRONTEND="noninteractive"
export DEBIAN_PRIORITY="critical"

# ----------------------------------------------------------------------------
# update the package manager
# ----------------------------------------------------------------------------

if [ "${apt_update:-no}" = 'yes' ]
then
    apt-get update                                                   || exit 1
fi

# ----------------------------------------------------------------------------
# upgrade the whole system
# ----------------------------------------------------------------------------

if [ "${apt_dist_upgrade:-no}" = 'yes' ]
then
    apt-get dist-upgrade -y                                          || exit 1
fi

# ----------------------------------------------------------------------------
# install the dependencies
# ----------------------------------------------------------------------------

if [ "${apt_install_packages:-no}" = 'yes' ]
then
    apt-get install -y ${apt_packages}                               || exit 1
fi

# ----------------------------------------------------------------------------
# install hugo
# ----------------------------------------------------------------------------

if [ "${apt_install_hugo:-no}" = 'yes' ]
then
    ./bin/install-hugo.sh "${HUGO_VERSION:-not-set}"                 || exit 1
fi

# ----------------------------------------------------------------------------
# remove packages that are no longer needed
# ----------------------------------------------------------------------------

if [ "${apt_autoremove:-no}" = 'yes' ]
then
    apt-get autoremove --purge -y                                    || exit 1
fi

# ----------------------------------------------------------------------------
# clean the local repository
# ----------------------------------------------------------------------------

if [ "${apt_clean:-no}" = 'yes' ]
then
    apt-get clean                                                    || exit 1
fi

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
