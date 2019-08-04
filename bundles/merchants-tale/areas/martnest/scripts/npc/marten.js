'use strict';

const { Broadcast, Logger } = require('ranvier');

module.exports = {
  listeners: {
    spawn: state => function () {
      Broadcast.sayAt(this.room, "A marten scurries into view.");
    },

    deathblow: state => function (player) {
      Broadcast.sayAt(player.room, `The marten tilts it's head as ${player.name} drops dead from their wounds.`);
    }
  }
};
