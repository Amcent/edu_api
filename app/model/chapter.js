'use strict';

const basicModel = require('./base.js');

class chapterModel extends basicModel {
  constructor(props = 'chapters') {
    super(props);
  }
}

module.exports = new chapterModel();
