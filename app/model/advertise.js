'use strict';

const config = require('./../../knexfile.js');
const knex = require('knex')(config);
const basicModel = require('./base.js');

class careerModel extends basicModel {
  constructor(props = 'advertises') {
    super(props);
  }


  joinMaterial(params) {
    return knex.transaction(trx => {
      const queries = [];

      params.forEach(item => {
        const query = knex('materials')
          .where('id', item.material_id)
          .select()
          .transacting(trx);

        queries.push(query);
      });

      Promise.all(queries)
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }

}

module.exports = new careerModel();
