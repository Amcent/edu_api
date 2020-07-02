'use strict';

const basicModel = require('./base.js');

class pathModel extends basicModel {
  constructor(props = 'materials') {
    super(props);
  }
}

module.exports = new pathModel();
