'use strict';

const basicModel = require('./base.js');

class storyModel extends basicModel {
  constructor(props = 'stories') {
    super(props);
  }
}

module.exports = new storyModel();
