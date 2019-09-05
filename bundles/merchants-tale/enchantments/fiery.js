'use strict';

const { Random } = require('rando-js');

const { Broadcast, Damage } = require('ranvier');

/**
 * Example enchantment script
 */
module.exports = {
  listeners: {
    hit: state => function (damage, target, finalAmount) {
      if (!damage.attacker || damage.attacker.isNpc) {
        return;
      }

      if(damage.source === this){
         return;
      }

      const amount = 4;
      const damage = new Damage("health",amount,player,this,{ type: 'fire'});
      damage.commit(this.target);
      console.log(amount+"FIRE DMG!");
    }
  }
};
