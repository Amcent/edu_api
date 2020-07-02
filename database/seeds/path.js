'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      const obj = {};

      obj.name = '路径' + j;
      obj.career_id = i;
      obj.description = '描述' + j;
      obj.sort = j;

      data.push(obj);
    }
  }

  // De letes ALL existing entries
  return knex('paths')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('paths').insert(data);
    });
};
