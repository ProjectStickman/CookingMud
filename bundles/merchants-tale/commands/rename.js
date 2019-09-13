'use strict';

const {
   Broadcast
} = require('ranvier');

const ArgParser = require('../../bundle-example-lib/lib/ArgParser');

module.exports = {
   usage: "rename <item> <name>",
   command: state => (args, player) => {
      args = args.trim();
      if (!args.length) {
         return Broadcast.sayAt(player, 'No item entered');
      }
      let [itemName, name] = args.split(/ (.+)/);

      if (!name) {
         return Broadcast.sayAt(player, 'What enchantment?');
      }

      const item = ArgParser.parseDot(itemName, player.inventory);
      if (!item) {
         return Broadcast.sayAt(player, "You aren't carrying anything like that.");
      }

      
      Broadcast.sayAt(player, "You renamed "+item.name+" to "+name);
      item.name = name;
   }
};