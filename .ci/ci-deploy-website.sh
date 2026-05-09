#!/bin/sh
#
# ci-deploy-website.sh - Copyright (c) 2001-2026 - Olivier Poncet
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

prefix="$(pwd)"
bindir="${prefix}/bin"
srcdir="${prefix}/src"
pubdir="${srcdir}/public"
tarball="${prefix}/website.tar.gz"

# ----------------------------------------------------------------------------
# check environment variables
# ----------------------------------------------------------------------------

if [ "${SSH_HOST:-not-set}" = 'not-set' ]
then
    echo "*** SSH_HOST is not set ***"
    exit 1
fi

if [ "${SSH_USER:-not-set}" = 'not-set' ]
then
    echo "*** SSH_USER is not set ***"
    exit 1
fi

if [ "${SSH_PRIV:-not-set}" = 'not-set' ]
then
    echo "*** SSH_PRIV is not set ***"
    exit 1
fi

if [ "${SSH_CMD:-not-set}" = 'not-set' ]
then
    echo "*** SSH_CMD is not set ***"
    exit 1
fi

# ----------------------------------------------------------------------------
# ssh variables
# ----------------------------------------------------------------------------

ssh_dir="${HOME}/.ssh"
ssh_config="${ssh_dir}/config"
ssh_identity="${ssh_dir}/id_deploy"
ssh_options="-o StrictHostKeyChecking=no"
ssh_host="${SSH_HOST}"
ssh_user="${SSH_USER}"
ssh_priv="${SSH_PRIV}"
ssh_dest="${ssh_user}@${ssh_host}"
ssh_cmd="${SSH_CMD}"

# ----------------------------------------------------------------------------
# create ssh directory if needed
# ----------------------------------------------------------------------------

if [ ! -d "${ssh_dir}" ]
then
    mkdir -p "${ssh_dir}"                                            || exit 1
    chmod 700 "${ssh_dir}"                                           || exit 1
fi

# ----------------------------------------------------------------------------
# install the private key
# ----------------------------------------------------------------------------

echo "${ssh_priv}" > "${ssh_identity}"                               || exit 1

# ----------------------------------------------------------------------------
# fix permissions for the private key
# ----------------------------------------------------------------------------

chmod 600 "${ssh_identity}"                                          || exit 1

# ----------------------------------------------------------------------------
# debug
# ----------------------------------------------------------------------------

set -x

# ----------------------------------------------------------------------------
# copy to destination server
# ----------------------------------------------------------------------------

scp ${ssh_options} -i "${ssh_identity}" "${tarball}" "${ssh_dest}:/tmp/" || exit 1

# ----------------------------------------------------------------------------
# deploy
# ----------------------------------------------------------------------------

ssh ${ssh_options} -i "${ssh_identity}" "${ssh_dest}" "${ssh_cmd}"   || exit 1

# ----------------------------------------------------------------------------
# uninstall the private key
# ----------------------------------------------------------------------------

rm -f "${ssh_identity}"                                              || exit 1

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
