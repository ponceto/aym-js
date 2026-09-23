#!/bin/sh
#
# install-hugo.sh - Copyright (c) 2001-2026 - Olivier Poncet
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
# along with this program.  If not, see <http://www.gnu.org/licenses/>
#

# ----------------------------------------------------------------------------
# guess config
# ----------------------------------------------------------------------------

case "$(uname -m 2>/dev/null)" in
    x86_64)
        arg_architecture='amd64'
        ;;
    aarch64)
        arg_architecture='arm64'
        ;;
    *)
        arg_architecture='not-set'
        ;;
esac

# ----------------------------------------------------------------------------
# options
# ----------------------------------------------------------------------------

arg_version="${1:-not-set}"
arg_architecture="${arg_architecture:-not-set}"
arg_package="hugo_${arg_version}_linux-${arg_architecture}.deb"
arg_repository="https://github.com/gohugoio/hugo"
arg_package_url="${arg_repository}/releases/download/v${arg_version}/${arg_package}"
arg_tmpdir="/tmp"
arg_installed="$(dpkg -l 'hugo' | grep '^ii' | awk '{print $3}')"

# ----------------------------------------------------------------------------
# check version
# ----------------------------------------------------------------------------

if [ "${arg_version}" = 'not-set' ]
then
    echo "*** please specify a version ***"
    exit 1
fi

# ----------------------------------------------------------------------------
# check architecture
# ----------------------------------------------------------------------------

if [ "${arg_architecture}" = 'not-set' ]
then
    echo "*** unsupported architecture ***"
    exit 1
fi

# ----------------------------------------------------------------------------
# check if already installed
# ----------------------------------------------------------------------------

if [ "${arg_installed}" = "${arg_version}" ]
then
    echo "=== hugo v${arg_version} is already installed ==="
    exit 0
fi

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# deploy
# ----------------------------------------------------------------------------

rm -f "${arg_tmpdir}/${arg_package}"                                 || exit 1
cd "${arg_tmpdir}"                                                   || exit 1
wget "${arg_package_url}"                                            || exit 1
apt-get install "${arg_tmpdir}/${arg_package}"                       || exit 1
rm -f "${arg_tmpdir}/${arg_package}"                                 || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
