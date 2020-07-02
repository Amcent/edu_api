'use strict';

const basicModel = require('./base.js');

class roleModel extends basicModel {
  constructor(props = 'roles') {
    super(props);
  }
}

module.exports = new roleModel();
