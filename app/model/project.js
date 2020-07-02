'use strict';

const basicModel = require('./base.js');

class projectModel extends basicModel {
  constructor(props = 'projects') {
    super(props);
  }
}

module.exports = new projectModel();
