'use strict';

const basicModel = require('./base.js');

class taskModel extends basicModel {
  constructor(props = 'role_permissions') {
    super(props);
  }
}

module.exports = new taskModel();
