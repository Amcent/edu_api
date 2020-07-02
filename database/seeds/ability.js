'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 0; i < length; i++) {
    const obj = {};

    obj.name = '技能' + (i + 1);
    obj.slug = i;
    obj.tag_line = '标识' + (i + 1);
    obj.cover_url = 'http://www.url.com/' + i;
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('abilities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('abilities').insert(data);
    });
};
