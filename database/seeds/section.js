'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 3;

  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      const obj = {};

      obj.chapter_id = i;
      obj.name = '课时' + j;
      obj.content = '内容' + j;
      obj.cover_url = 'http://www.url.com/' + i;
      obj.sort = j;
      obj.created_time = new Date();
      obj.updated_time = null;

      data.push(obj);
    }
  }

  // De letes ALL existing entries
  return knex('sections').del()
    .then(function() {

      // Inserts seed entries
      return knex('sections').insert(data);
    });
};
