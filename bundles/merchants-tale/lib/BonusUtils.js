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

   static addEnchantment(item, enchantment, factory){
      //Putting the data on the item
      var obj = {};
      obj[enchantment.id] = enchantment;
      item.setMeta("enchantment", obj);
      
      var path = "../../merchants-tale/enchantments/"+enchantment.id+".js";
      console.log("Script:"+path);
      try {
         if (fs.existsSync(path)) {
            BundleManager.loadEntityScript(factory, item.title, path);
            console.log(`Enchantment loaded for ${ItemUtil.display(item)} at `+path);
         }
      } catch(err) {
         console.log("FILE DOESNT' EXIST: "+path);
      }
      
      return true;
  }
}

module.exports = BonusUtils;
