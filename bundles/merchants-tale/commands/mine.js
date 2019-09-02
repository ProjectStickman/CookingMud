'use strict';

const { Broadcast } = require('ranvier');
const ArgParser = require('../../bundle-example-lib/lib/ArgParser');

module.exports = {
  // `usage` is shown when viewing the helpfile for a command, see the Helpfiles section for more detail
  aliases: [ 'dig', 'spelunk' ],
  usage: 'mine',
  command : state => (args, player) => {
   const item = ArgParser.parseDot("pickaxe", player.equipment);
   if (!item) {
     Broadcast.sayAt(player, "You don't have a pickaxe");
   }
   Broadcast.sayAt(player, "You begin mining with "+item.name+"...");
   const itemRef = "jobs:ironpickaxe";

   //String to object
   const area = state.AreaManager.getAreaByReference(itemRef);
   const newItem = state.ItemFactory.create(area, itemRef);
   newItem.hydrate(state);
   //Add to player
   player.addItem(newItem);
  }
};