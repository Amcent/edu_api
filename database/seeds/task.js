'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      for (let k = 1; k <= length; k++) {
        for (let l = 1; l <= length; l++) {
          const obj = {};

          obj.name = '任务' + l;
          obj.content = '内容' + l;
          obj.project_id = i;
          obj.version_id = j;
          obj.sort = l;
          obj.status = Math.floor(Math.random() * 1);
          obj.level = Math.floor(Math.random() * 3) + 1;
          obj.platform = Math.floor(Math.random() * 3) + 1;
          obj.created_time = new Date();
          obj.updated_time = null;

          data.push(obj);
        }
      }
    }
  }

  // De letes ALL existing entries
  return knex('tasks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('tasks').insert(data);
    });
};
