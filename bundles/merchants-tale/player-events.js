'use strict';

const sprintf = require('sprintf-js').sprintf;
const BonusUtil = require('./lib/BonusUtils.js');
const { Broadcast: B, Config, Logger } = require('ranvier');
const enchantmentsSet = {};

module.exports = {
  listeners: {
    updateTick: state => function () {
      if(!enchantmentsSet[this.name]){
         console.log("Populate enchantmets for "+this.name);
         B.sayAt(this, "update_tick");
         enchantmentsSet[this.name] = true;
         const inventory = this.inventory;
         const equip = this.equipment;
         //console.log(inventory);
         //var itemEnchantments = item.getMeta("enchantment");
         if(inventory){
            inventory.forEach(function(item) {
               const enchantments = item.getMeta("enchantment");
               if(enchantments){
                  for (let key of Object.keys(enchantments)) {
                     var enchantment = enchantments[key];
                     BonusUtil.addEnchantment(item, enchantment, state.ItemFactory);
                  } 
               }
            });
         }

         if(equip){
            equip.forEach(function(item) {
               const enchantments = item.getMeta("enchantment");
               if(enchantments){
                  for (let key of Object.keys(enchantments)) {
                     var enchantment = enchantments[key];
                     BonusUtil.addEnchantment(item, enchantment, state.ItemFactory);
                  } 
               }
            });
         }
      }
    }
  }
};