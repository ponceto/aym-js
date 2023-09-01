#
# Makefile - Copyright (c) 2001-2023 - Olivier Poncet
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
# global targets
# ----------------------------------------------------------------------------

all : build

build : hugo-build
	@echo "=== $@ done ==="

clean : hugo-clean
	@echo "=== $@ done ==="

serve : hugo-serve
	@echo "=== $@ done ==="

deploy : hugo-deploy
	@echo "=== $@ done ==="

mrproper : git-clean
	@echo "=== $@ done ==="

fix : fix-source-tree
	@echo "=== $@ done ==="

# ----------------------------------------------------------------------------
# hugo targets
# ----------------------------------------------------------------------------

hugo-build :
	./bin/hugo-build.sh

hugo-clean :
	./bin/hugo-clean.sh

hugo-serve :
	./bin/hugo-serve.sh

hugo-deploy :
	./bin/hugo-deploy.sh

# ----------------------------------------------------------------------------
# git targets
# ----------------------------------------------------------------------------

git-status :
	git status --verbose

git-pull :
	git pull --verbose --all

git-push :
	git push --verbose

git-clean :
	git clean -f -d -x

# ----------------------------------------------------------------------------
# fix targets
# ----------------------------------------------------------------------------

fix-source-tree : fix-empty-folders fix-folder-permissions fix-file-permissions
	true

fix-empty-folders :
	find ./src -type d -empty -exec touch {}/.gitkeep \;

fix-folder-permissions :
	find ./src -type d -exec chmod 755 {} \;

fix-file-permissions :
	find ./src -type f -exec chmod 644 {} \;

# ----------------------------------------------------------------------------
# End-Of-File
# ----------------------------------------------------------------------------
