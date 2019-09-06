'use strict';

const { Broadcast, Damage } = require('ranvier');

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

      if(damageSource.source === this){
         return;
      }

      const amount = 4;
      const damage = new Damage("health",amount,player,this,{ type: 'fire'});
      damage.commit(this.target);
      Broadcast.sayAt(this, "Your sword burns the target for "+amount+" fire damage!");
      console.log(amount+"FIRE DMG!");
    },
    combatStart: state => function() {
      console.log("Combat started!");
    }
  }
};