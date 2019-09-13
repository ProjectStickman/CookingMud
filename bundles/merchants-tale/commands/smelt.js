'use strict';

const {
   Broadcast
} = require('ranvier');

const ArgParser = require('../../bundle-example-lib/lib/ArgParser');
const loadedResources = require('../../simple-crafting/data/resources.json');


module.exports = {
   aliases: ['melt'],
   usage: "smelt <item>",
   command: state => (args, player) => {
      args = args.trim();
      if (!args.length) {
         return Broadcast.sayAt(player, 'No item entered');
      }
      const playerResources = player.getMeta('resources');
      const resourceName = getResource(args, playerResources);
      const resource = loadedResources[resourceName];
      if (!resource) {
         return Broadcast.sayAt(player, "You don't have that resource.");
      }

      if(resource.type != 'ore'){
         return Broadcast.sayAt(player, "You can't smelt that.");
      }

      resource.fuel = resource.fuel || 'coal';
      fuel = player.getMeta("resources."+resource.fuel);
      if(fuel){
         return Broadcast.sayAt(player, "You don't have enough "+resource.fuel+" to smelt that.");
      }

      const intoKey = "resources."+resource.smelt_into;
      player.setMeta(intoKey, (player.getMeta(intoKey) || 0) + 1);
      const fromKey = "resources."+resourceName;
      player.setMeta(fromKey, player.getMeta(fromKey) - 1);
      

      Broadcast.sayAt(player, "You smelted some "+resource.title+" into "+loadedResources[resource.smelt_into].title);
   }
};

function getResource(name) {
   var name = name.toUpperCase();
   //Exact match ignoring case
   for (let resource of Object.keys(loadedResources)) {
     var title = loadedResources[resource].title;
     title = title.toUpperCase();
     if (title == name) {
       var found = loadedResources[resource];
       return resource;
     }
   }
   //Partial match ignoring case
   for (let resource of Object.keys(loadedResources)) {
     var title = loadedResources[resource].title;
     title = title.toUpperCase();
     if (title.includes(name)) {
       var found = loadedResources[resource];
       return resource;
     }
   }
   return false;
 }