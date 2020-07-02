'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const obj = {};

      obj.course_id = i + 1;
      obj.name = '章节' + (j + 1);
      obj.sort = j + 1;
      obj.created_time = new Date();
      obj.updated_time = null;

      data.push(obj);
    }
  }

  // Deletes ALL existing entries
  return knex('chapters').del()
    .then(function() {

      // Inserts seed entries
      return knex('chapters').insert(data);
    });
};
