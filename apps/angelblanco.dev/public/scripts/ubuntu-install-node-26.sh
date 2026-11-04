#!/bin/bash
#
# Author: Ángel Blanco
# License: MIT
#
# This script is provided "as is", without warranty of any kind. Use at your own risk.
#
# Source: https://angelblanco.dev/blog/apt-install-node-26-on-ubuntu-26
#
# Usage:
#   curl -fsSL https://angelblanco.dev/scripts/ubuntu-install-node-26.sh | bash
#
# This file sets up the installation of Node.js and several package managers.
# Normally you will call it from your non-root user, elevated permissions
# will be granted with sudo.
#

set -e

# Basic confirmation module before executing the script.
confirm_action() {
    read -p "$1 (y/n): " choice < /dev/tty
    case "$choice" in
        [Yy]|[Yy][Ee][Ss])
            return 0
            ;;
        [Nn]|[Nn][Oo])
            return 1
            ;;
        *)
            echo "Invalid choice. Please enter 'y' or 'n'."
            confirm_action "$1"
            ;;
    esac
}

# You can configure these variables if needed
NODE_VERSION=26
NPM_PREFIX="~/.npm-global"
DEPS="ca-certificates curl gnupg"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "This script will install Node.js and optionally other package managers."
echo ""

if ! confirm_action "Install Node.js version $NODE_VERSION?"; then
    echo "Skipping Node.js installation. Exiting."
    exit 0
fi

echo "Installing deps needed for installing nodejs..."

sudo apt update
sudo apt install -y $DEPS

echo "Installing nodejs"
curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x -o $TMP_DIR/nodesource_setup.sh
sudo -E bash $TMP_DIR/nodesource_setup.sh

sudo apt-get install -y nodejs

mkdir -p ~/.npm-global
npm config set prefix $NPM_PREFIX
echo "Npm prefix set to $NPM_PREFIX"

echo "Node.js installation completed."
echo "Node version: "
node --version

echo ""

if confirm_action "Install pnpm?"; then
    echo "Installing pnpm..."
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    echo "pnpm installation completed. Open a new terminal (or source your shell config) to use it."
fi

echo ""

if confirm_action "Install Bun?"; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    echo "Bun version: "
    bun --version
fi

echo ""
echo "Installation process finished."
echo ""
echo "You probably want to add global npm bin directory to your path on your .bashrc or .zshrc, to do so, include this line"
echo 'export PATH=~/.npm-global/bin:$PATH'
echo ""
echo "Node.js now comes from apt, so keep it patched with:"
echo "sudo apt update && sudo apt upgrade"
echo ""
