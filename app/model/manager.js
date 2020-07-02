'use strict';

const config = require('./../../knexfile.js');
const knex = require('knex')(config);
const basicModel = require('./base.js');

class managerModel extends basicModel {
  constructor(props = 'managers') {
    super(props);
  }

  joinRole(pageSize, currentPage) {
    const offset = (currentPage - 1) * pageSize;
    return knex('managers')
      .offset(offset)
      .limit(pageSize)
      .join('roles', { 'roles.id': 'managers.role_id' })
      .select(
        'managers.id',
        'managers.name',
        'phone',
        'roles.name as role',
        'role_id',
        'managers.created_at',
        'managers.updated_at'
      );
  }
}

module.exports = new managerModel();
