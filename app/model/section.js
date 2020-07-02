'use strict';

const basicModel = require('./base.js');

class sectionModel extends basicModel {
  constructor(props = 'sections') {
    super(props);
  }
}

module.exports = new sectionModel();
