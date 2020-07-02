'use strict';

const config = require('./../../knexfile.js');
const knex = require('knex')(config);
const basicModel = require('./base.js');

class questionModel extends basicModel {
  constructor(props = 'questions') {
    super(props);
  }

  joinAbility(pageSize, currentPage) {
    const offset = (currentPage - 1) * pageSize;
    return knex('questions')
      .offset(offset)
      .limit(pageSize)
      .join('abilities', { 'abilities.id': 'questions.ability_id' })
      .select(
        'questions.id',
        'stem',
        'ability_id',
        'abilities.name',
        'level',
        'option',
        'answer',
        'questions.created_at',
        'questions.updated_at'
      );
  }
}

module.exports = new questionModel();
