'use strict';

const basicModel = require('./base.js');

class roleModel extends basicModel {
  constructor(props = 'permissions') {
    super(props);
  }
}

module.exports = new roleModel();
