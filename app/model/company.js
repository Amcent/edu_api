'use strict';

const basicModel = require('./base.js');

class companyModel extends basicModel {
  constructor(props = 'companies') {
    super(props);
  }
}

module.exports = new companyModel();
