'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 0; i < length; i++) {
    const obj = {};

    obj.name = '名称' + (i + 1);
    obj.phone = '1350111111' + (i + 1);
    obj.role_id = (i + 1);
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('managers')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('managers').insert(data);
    });
};
