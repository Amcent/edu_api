'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 0; i < length; i++) {
    const obj = {};

    obj.name = '项目' + (i + 1);
    obj.description = '描述' + (i + 1);
    obj.content = '口  内容' + (i + 1);
    obj.status = Math.floor(Math.random() * 1);
    obj.cover_url = 'http://www.url.com/' + i;
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('projects')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert(data);
    });
};
