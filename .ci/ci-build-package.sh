#!/bin/sh
#
# ci-build-package.sh - Copyright (c) 2001-2026 - Olivier Poncet
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
# move to sources
# ----------------------------------------------------------------------------

cd "${arg_srcdir}"                                                   || exit 1

# ----------------------------------------------------------------------------
# create public directory
# ----------------------------------------------------------------------------

mkdir -p "${arg_pubdir}"                                             || exit 1

# ----------------------------------------------------------------------------
# create index.html if necessary
# ----------------------------------------------------------------------------

touch "${arg_pubdir}/index.html"                                     || exit 1

# ----------------------------------------------------------------------------
# bump package version (ci only)
# ----------------------------------------------------------------------------

if [ "${CI:-not-set}" != 'not-set' ]
then
    pkg_version="1.0.0+$(date '+%Y%m%d%H%M%S')"
    pkg_changelog='debian/changelog'
    pkg_tmpfile='debian/changelog.tmp'
    {
        echo "${arg_basename} (${pkg_version}) stable; urgency=medium"
        echo ''
        echo '  * Automated CI build.'
        echo ''
        echo " -- Olivier Poncet <ponceto@free.fr>  $(date -R)"
        echo ''
        cat "${pkg_changelog}"
    } > "${pkg_tmpfile}"                                             || exit 1
    mv "${pkg_tmpfile}" "${pkg_changelog}"                           || exit 1
fi

# ----------------------------------------------------------------------------
# build package
# ----------------------------------------------------------------------------

dpkg-buildpackage --build=any,all --no-sign                          || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
