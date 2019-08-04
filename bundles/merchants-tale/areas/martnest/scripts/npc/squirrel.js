'use strict';

const { Broadcast, Logger } = require('ranvier');

module.exports = {
  listeners: {
    spawn: state => function () {
      Broadcast.sayAt(this.room, "A squirrel scurries into view.");
    },

    deathblow: state => function (player) {
      Broadcast.sayAt(player.room, `The squirrel seems to snicker as ${player.name} drops dead from their wounds.`);
    }
  }
};
