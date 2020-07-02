'use strict';

const basicModel = require('./base.js');

class advertiseMaterialModel extends basicModel {
  constructor(props = 'advertise_material') {
    super(props);
  }
}

module.exports = new advertiseMaterialModel();
