#!/bin/bash


if which node > /dev/null; then
    echo "Installing Node ..."
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install nodejs -y
    echo "Node has been installed."
else
    echo "Node has already been installed."
fi