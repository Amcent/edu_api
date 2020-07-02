'use strict';

const config = require('./../../knexfile.js');
const knex = require('knex')(config);

class baseModel {
  constructor(props) {
    this.table = props;
  }

  knex() {
    return knex(this.table);
  }

  where(params) {
    return knex(this.table).where(params);
  }

  all() {
    return knex(this.table).select();
  }

  insert(params) {
    return knex(this.table).insert(params);
  }

  show(params) {
    return knex(this.table).where(params).select();
  }

  delete(params) {
    return knex(this.table).where('id', '=', params).del();
  }

  update(id, params) {
    return knex(this.table).where('id', '=', id).update(params);
  }

  count(params) {
    return knex(this.table).count(params);
  }

  pagination(pageSize, currentPage) {
    const size = Number(pageSize);
    const current = Number(currentPage);
    const offset = (current - 1) * size;
    return (
      knex(this.table)
        // .where(params)
        .offset(offset)
        .limit(pageSize)
        .select()
    );
  }

  cross(table, key, params) {
    return knex.transaction(trx => {
      const queries = [];

      params.forEach(item => {
        const query = knex(table)
          .where(key, item.id)
          .select()

          .transacting(trx);

        queries.push(query);
      });

      Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });
  }

  sort(params) {
    return knex.transaction(trx => {
      const queries = [];

      params.forEach(item => {
        const query = knex(this.table)
          .where('id', item.id)
          .update({
            sort: item.sort,
          })
          .transacting(trx);

        queries.push(query);
      });

      Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });
  }

  join(table, params) {
    return knex(this.table).join(table, params).select();
  }

  findOrCreate(param, params) {
    return knex.transaction(trx => {
      knex(this.table)
        .where(param)
        .then(res => {
          if (res.length === 0) {
            return knex(this.table)
              .insert(params)
              .transacting(trx)
              .then(response => {
                return { id: response, params };
              });
          }

          return res;
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }
}

module.exports = baseModel;
