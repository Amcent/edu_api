'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 1; i <= length; i++) {
    const obj = {};

    obj.name = '职业' + i;
    obj.description = '描述' + i;
    obj.cover_url = 'http://www.url.com/' + i;
    obj.sort = i;
    obj.status = Math.floor(Math.random() * 1);
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('careers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('careers').insert(data);
    });
};
