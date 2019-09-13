'use strict';

const { Broadcast, Damage } = require('ranvier');
var path = require('path');

/**
 * Example enchantment script
 */
module.exports = {
  listeners: {
    hit: state => function (damageSource, target, finalAmount) {
      console.log("Loaded Script Fiery----------------------");
      if (!damageSource.attacker || damageSource.attacker.isNpc) {
        return;
      }

      if(damageSource.source === this && damageSource.metadata.enchantment){
        return;
      }

      const amount = 4;
      const damage = new Damage("health",amount,damageSource.attacker,this,
      { 
        enchantment: true,
        type: 'fire'
      });
      Broadcast.sayAt(damageSource.attacker, "You burn the target!");
      damage.commit(target);
      console.log(amount+"FIRE DMG!");
    },
    combatStart: state => function() {
      console.log("Combat started!");
    }
  }
};