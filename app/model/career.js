'use strict';

const basicModel = require('./base.js');

class careerModel extends basicModel {
  constructor(props = 'careers') {
    super(props);
  }
}

module.exports = new careerModel();
