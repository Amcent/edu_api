'use strict';

const basicModel = require('./base.js');

class taskModel extends basicModel {
  constructor(props = 'tasks') {
    super(props);
  }
}

module.exports = new taskModel();
