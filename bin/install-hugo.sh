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
        opt_architecture="amd64"
        ;;
    aarch64)
        opt_architecture="arm64"
        ;;
    *)
        opt_architecture="unknown"
        ;;
esac

# ----------------------------------------------------------------------------
# options
# ----------------------------------------------------------------------------

opt_version="${1:-not-set}"
opt_architecture="${opt_architecture:-not-set}"
opt_package="hugo_${opt_version}_linux-${opt_architecture}.deb"
opt_repository="https://github.com/gohugoio/hugo"
opt_package_url="${opt_repository}/releases/download/v${opt_version}/${opt_package}"
opt_tmpdir="/tmp"
opt_installed="$(dpkg -l 'hugo' | grep '^ii' | awk '{print $3}')"

# ----------------------------------------------------------------------------
# check options
# ----------------------------------------------------------------------------

if [ "${opt_version}" = 'not-set' ]
then
    echo "*** please specify a version ***"
    exit 1
fi

# ----------------------------------------------------------------------------
# check if already installed
# ----------------------------------------------------------------------------

if [ "${opt_installed}" = "${opt_version}" ]
then
    echo "=== hugo v${opt_version} is already installed ==="
    exit 0
fi

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# deploy
# ----------------------------------------------------------------------------

rm -f "${opt_tmpdir}/${opt_package}"                                 || exit 1
cd "${opt_tmpdir}"                                                   || exit 1
wget "${opt_package_url}"                                            || exit 1
apt install "${opt_tmpdir}/${opt_package}"                           || exit 1
rm -f "${opt_tmpdir}/${opt_package}"                                 || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
