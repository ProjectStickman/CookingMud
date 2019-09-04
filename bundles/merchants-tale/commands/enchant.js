'use strict';

const { Broadcast } = require('ranvier');
const ArgParser = require('../../bundle-example-lib/lib/ArgParser');
const ItemUtil = require('../../bundle-example-lib/lib/ItemUtil');

module.exports = {
  usage: 'enchant <item>',
  command : (state) => (args, player) => {
    args = args.trim();

    if (!args.length) {
      return Broadcast.sayAt(player, 'Enchant what?');
    }

    const item = ArgParser.parseDot(args, player.inventory);

    if (!item) {
      return Broadcast.sayAt(player, "You aren't carrying anything like that.");
    }

    const enchantment = new Enchantment("Magical",1);

    if(!item.getMeta("enchantment")){
      var array = Array();
      array.push(enchantment);
      item.setMeta("enchantment", array);
    }else{
      var array = Array(enchantment);
      array.push(enchantment);
      item.setMeta("enchantment", array);
    }

    Broadcast.sayAt(player, `<green>You enchanted: </green>${ItemUtil.display(item)}<green>.</green>`);
  }
};

class Enchantment{
   constructor(name, level) {
      this.name = name;
      this.level = level;
   }
}