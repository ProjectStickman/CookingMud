'use strict';

const ranvier = require('ranvier');
const BundleManager = ranvier.BundleManager;
const { Broadcast } = ranvier;
const ArgParser = require('../../bundle-example-lib/lib/ArgParser');
const ItemUtil = require('../../bundle-example-lib/lib/ItemUtil');
const Data = ranvier.Data;
const fs = require('fs')

class BonusUtils{
   static convertToRoman(num) {
      var roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
      };
      var str = '';
   
      for (var i of Object.keys(roman)) {
      var q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
      }
   
      return str;
   }

   static addEnchantment(item, enchantment, state){
      var factory = state.ItemFactory;
      //Putting the data on the item
      var obj = {};
      obj[enchantment.id] = enchantment;
      item.setMeta("enchantment", obj);
      
      var path = "./bundles/merchants-tale/enchantments/"+enchantment.id+".js";
      console.log("Script:"+path);
      fs.access(path, fs.F_OK, (err) => {
         if (err) {
            console.error(err)
            return ;
         }
         console.log("Script found!");
         //const entityRef = factory.createEntityRef(item.area.name, item.id);
         BundleManager.prototype.loadEntityScript(factory, item.uuid, "../../."+path);
         item.setupBehaviors(state.ItemBehaviorManager);
         factory.scripts.get(item.uuid).attach(item);
         console.log('Enchantment loaded for '+item.name+' at '+path);
         return true;
      })
      return;
  }

   static qualityColorize(quality, string) {
      var qualityColors = ItemUtil.qualityColors;
      const colors = qualityColors[quality || 'common'];
      const open = '<' + colors.join('><') + '>';
      const close = '</' + colors.reverse().join('></') + '>';
      return open + string + close;
   }
}

module.exports = BonusUtils;
