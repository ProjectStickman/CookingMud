'use strict';

const {
   Broadcast,
   Room,
   Item,
   ItemType,
   Logger,
   Player
 } = require('ranvier');

module.exports = {
   aliases: ['description'],
   usage: "bio <text>",
   command: state => (args, player) => {
      args = args.trim();
      if (!args.length) {
        return Broadcast.sayAt(player, 'No description entered');
      }
      player.setMeta('bio',args);
   }
 };