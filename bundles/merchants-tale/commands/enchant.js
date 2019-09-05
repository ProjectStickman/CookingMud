'use strict';
const ranvier = require('ranvier');
const { Broadcast } = ranvier;
const ArgParser = require('../../bundle-example-lib/lib/ArgParser');
const ItemUtil = require('../../bundle-example-lib/lib/ItemUtil');
const BonusUtil = require('../../merchants-tale/lib/BonusUtils.js');

const dataPath = __dirname + '/../data/';
const loadedEnchantments = require(dataPath + 'enchantments.json');

module.exports = {
  usage: 'enchant <item> <enchantment>',
  command : (state) => (args, player) => {
    args = args.trim();
    if (!args.length) {
      return Broadcast.sayAt(player, 'Enchant what?');
    }
    let [itemName, enchantmentName] = args.split(' ');

    if (!enchantmentName) {
      return Broadcast.sayAt(player, 'What enchantment?');
    }
    
    const item = ArgParser.parseDot(itemName, player.inventory);
    if (!item) {
      return Broadcast.sayAt(player, "You aren't carrying anything like that.");
    }

    const enchantment = getEnchantment(enchantmentName);
    if (!enchantment) {
      return Broadcast.sayAt(player, "You either don't know that enchantment or it doesn't exist.");
    }



    var itemEnchantments = item.getMeta("enchantment");
    if(itemEnchantments){
      const existingEnchatment = itemEnchantments[enchantment.id];
      //Upgrading enchantments
      console.log(existingEnchatment);
      console.log(existingEnchatment.level);
      if(existingEnchatment){
        if(existingEnchatment.level < existingEnchatment.maxLevel){
          enchantment.level += 1;
        }else{
          Broadcast.sayAt(player, "Enchantment already at the highest level:");
          return Broadcast.sayAt(player, '- <cyan>'+existingEnchatment.title+' - '+BonusUtil.convertToRoman(existingEnchatment.level)+'</cyan>');
        }
      }
    }

    BonusUtil.addEnchantment(item, enchantment, state.ItemFactory);

    Broadcast.sayAt(player, `<green>You enchanted: </green>${ItemUtil.display(item)} with <cyan>`+enchantment.title+'</cyan>');
  }
};

class Enchantment{
  constructor(title, maxLevel, id) {
    this.title = title;
    this.level = 1;
    this.maxLevel = maxLevel;
    this.id = id;
  }
}

function getEnchantment(name){
  var name = name.toUpperCase();
  //Exact match ignoring case
  for (let enchantment of Object.keys(loadedEnchantments)) {
    var title = loadedEnchantments[enchantment].title;
    title = title.toUpperCase();
    if(title == name){
      var found = loadedEnchantments[enchantment];
      return new Enchantment(found.title, found.maxLevel, enchantment);
    }
  }
  //Partial match ignoring case
  for (let enchantment of Object.keys(loadedEnchantments)) {
    var title = loadedEnchantments[enchantment].title;
    title = title.toUpperCase();
    if(title.includes(name)){
      var found = loadedEnchantments[enchantment];
      return new Enchantment(found.title, found.maxLevel, enchantment);
    }
  }
  return false;
}