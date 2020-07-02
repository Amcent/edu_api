'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 0; i < length; i++) {
    const obj = {};

    obj.name = '课程' + (i + 1);
    obj.title = '副标题' + (i + 1);
    obj.description = '提示' + (i + 1);
    obj.cover_url = 'www.cover.com/' + i;
    obj.status = Math.floor(Math.random() * 1);
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function() {
      // Inserts seed entries
      return knex('courses').insert(data);
    });
};
