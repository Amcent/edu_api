'use strict';

const basicModel = require('./base.js');

class userModel extends basicModel {
  constructor(props = 'users') {
    super(props);
  }
}

module.exports = new userModel();
