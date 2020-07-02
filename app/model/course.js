'use strict';

const basicModel = require('./base.js');

class courseModel extends basicModel {
  constructor(props = 'courses') {
    super(props);
  }

  recommand(param) {
    const count = param || 4;
    return this.knex('courses').limit(count).select();
  }
}

module.exports = new courseModel();
