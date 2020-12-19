#!/bin/sh

cd /home/ben/discord
chmod +x scrapeNicks.sh
pm2 stop discord-bots
npm install
pm2 start discord-bots