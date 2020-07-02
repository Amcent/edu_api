'use strict';

const basicModel = require('./base.js');

class roleModel extends basicModel {
  constructor(props = 'permission_groups') {
    super(props);
  }
}

module.exports = new roleModel();
