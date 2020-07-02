'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let k = 1; k <= length; k++) {
      const obj = {};

      obj.stem = '题目' + k;
      obj.option = 'xx, yy, zz';
      obj.ability_id = i;
      obj.level = k;
      obj.answer = k;
      obj.created_time = new Date();
      obj.updated_time = null;

      data.push(obj);
    }
  }

  // De letes ALL existing entries
  return knex('questions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('questions').insert(data);
    });
};
