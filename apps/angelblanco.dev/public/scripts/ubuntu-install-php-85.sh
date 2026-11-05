#!/bin/bash
#
# Author: Ángel Blanco
# License: MIT
#
# This script is provided "as is", without warranty of any kind. Use at your own risk.
#
# Source: https://angelblanco.dev/blog/apt-install-php-85-on-ubuntu-26
#
# Usage:
#   curl -fsSL https://angelblanco.dev/scripts/ubuntu-install-php-85.sh | bash
#
# Install PHP (from packages.sury.org) and Composer on Ubuntu.
# Normally you will call it from your non-root user; elevated permissions
# will be granted with sudo.
#

set -euo pipefail

# You can configure these variables if needed
PHP_VERSION="8.5"
PHP_EXTENSIONS="cli mbstring curl zip xml"
KEYRING="/usr/share/keyrings/debsuryorg-archive-keyring.gpg"
SOURCE_FILE="/etc/apt/sources.list.d/php.sources"

# Basic confirmation module before executing the script.
confirm_action() {
    while true; do
        read -r -p "$1 (y/n): " choice < /dev/tty
        case "$choice" in
            [Yy]|[Yy][Ee][Ss]) return 0 ;;
            [Nn]|[Nn][Oo])     return 1 ;;
            *)                 echo "Invalid choice. Please enter 'y' or 'n'." ;;
        esac
    done
}

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

if ! confirm_action "Install PHP $PHP_VERSION from packages.sury.org?"; then
    echo "Skipping PHP installation. Exiting."
    exit 0
fi

# --- Prerequisites ---------------------------------------------------------
sudo apt update
sudo apt install -y ca-certificates curl unzip

# --- Sury signing key (official keyring package) ---------------------------
curl -fsSLo "$WORKDIR/debsuryorg-archive-keyring.deb" https://packages.sury.org/debsuryorg-archive-keyring.deb
sudo dpkg -i "$WORKDIR/debsuryorg-archive-keyring.deb"

# --- Sury repository --------------------------------------------------------
CODENAME="$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")"

sudo tee "$SOURCE_FILE" > /dev/null <<EOF
Types: deb
URIs: https://packages.sury.org/php/
Suites: $CODENAME
Components: main
Architectures: $(dpkg --print-architecture)
Signed-By: $KEYRING
EOF

sudo apt update

# --- PHP --------------------------------------------------------------------
# Use -cli instead of the bare "phpX.Y" metapackage, which pulls in Apache.
PACKAGES=""
for EXTENSION in $PHP_EXTENSIONS; do
    PACKAGES="$PACKAGES php${PHP_VERSION}-${EXTENSION}"
done

# shellcheck disable=SC2086
sudo apt install -y $PACKAGES

sudo update-alternatives --set php "/usr/bin/php${PHP_VERSION}"

echo ""
php --version
echo ""

# --- Composer ---------------------------------------------------------------
if confirm_action "Install Composer?"; then
    cd "$WORKDIR"

    EXPECTED_CHECKSUM="$(curl -fsSL https://composer.github.io/installer.sig)"
    curl -fsSLo composer-setup.php https://getcomposer.org/installer
    ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

    if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then
        >&2 echo "ERROR: Invalid Composer installer checksum"
        exit 1
    fi

    php composer-setup.php --quiet
    sudo install -m 0755 composer.phar /usr/local/bin/composer

    echo ""
    composer --version
fi

echo ""
echo "Installation process finished."
echo "Run 'sudo apt update && sudo apt upgrade' periodically to get PHP security releases."
