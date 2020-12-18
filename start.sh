#!/bin/sh

cd /home/ben/discord
pm2 stop discord-bots
npm install
pm2 start discord-bots