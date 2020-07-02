'use strict';

const config = require('./../../knexfile.js');
const knex = require('knex')(config);
const basicModel = require('./base.js');

class authModel extends basicModel {
  constructor(props = 'sms_logs') {
    super(props);
  }

  having(params) {
    return knex('sms_logs')
      .where(params)
      .having('created_time', '>', new Date(new Date() - 1000 * 60 * 10));
  }
}

module.exports = new authModel();
