'use strict';

const basicModel = require('./base.js');

class versionModel extends basicModel {
  constructor(props = 'versions') {
    super(props);
  }
}

module.exports = new versionModel();
