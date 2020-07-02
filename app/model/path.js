'use strict';

const basicModel = require('./base.js');

class pathModel extends basicModel {
  constructor(props = 'paths') {
    super(props);
  }
}

module.exports = new pathModel();
