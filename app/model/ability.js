'use strict';

const basicModel = require('./base.js');

class abilityModel extends basicModel {
  constructor(props = 'abilities') {
    super(props);
  }
}

module.exports = new abilityModel();
