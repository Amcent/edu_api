'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      for (let k = 1; k <= length; k++) {
        const obj = {};

        obj.name = '故事' + k;
        obj.content = '内容' + k;
        obj.project_id = i;
        obj.version_id = j;
        obj.sort = k;
        obj.created_time = new Date();
        obj.updated_time = null;

        data.push(obj);
      }
    }
  }

  // De letes ALL existing entries
  return knex('stories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('stories').insert(data);
    });
};
