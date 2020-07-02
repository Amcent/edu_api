'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;
  let course_id = 1;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      for (let k = 1; k <= length; k++) {
        const obj = {};

        obj.career_id = i;
        obj.path_id = j;
        obj.course_id = course_id++;
        obj.sort = k;

        data.push(obj);
      }
    }
  }

  // De letes ALL existing entries
  return knex('career_course')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('career_course').insert(data);
    });
};
