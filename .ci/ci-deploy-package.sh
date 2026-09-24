#!/bin/sh
#
# ci-deploy-package.sh - Copyright (c) 2001-2026 - Olivier Poncet
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

# ----------------------------------------------------------------------------
# resolve package file
# ----------------------------------------------------------------------------

pkg_path="$(ls -1 "${arg_prefix}/${arg_basename}"_*_all.deb 2>/dev/null | tail -n 1)"

if [ "${pkg_path:-not-set}" = 'not-set' ] || [ ! -f "${pkg_path}" ]
then
    echo "*** package file not found ***"
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
pkg_file="$(basename "${pkg_path}")"
ssh_cmd="export DEBIAN_FRONTEND=\"noninteractive\"; export DEBIAN_PRIORITY=\"critical\"; apt-get install -y \"/tmp/${pkg_file}\" && rm -f \"/tmp/${pkg_file}\""

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

scp ${ssh_options} -i "${ssh_identity}" "${pkg_path}" "${ssh_dest}:/tmp/" || exit 1

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
