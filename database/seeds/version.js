'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      const obj = {};

      obj.project_id = i;
      obj.name = 'V' + j;
      obj.sort = j;
      obj.created_time = new Date();
      obj.updated_time = null;

      data.push(obj);
    }
  }

  // De letes ALL existing entries
  return knex('versions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('versions').insert(data);
    });
};
