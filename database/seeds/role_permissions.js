'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 1; i <= length; i++) {
    const obj = {};
    const permissions = Math.floor(Math.random() * 6) + 1;
    const arr = [];

    for (let j = 1; j <= permissions; j++) {
      arr.push(Math.floor(Math.random() * 6) + 1);
    }

    obj.role_id = i;
    obj.permission_slug = `${arr}`;
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('role_permissions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('role_permissions').insert(data);
    });
};
