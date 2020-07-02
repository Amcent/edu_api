'use strict';

exports.seed = function(knex) {
  const data = [];
  const length = 15;

  for (let i = 0; i < length; i++) {
    const obj = {};

    obj.name = '企业' + (i + 1);
    obj.short_name = '短称' + (i + 1);
    obj.slogan = '口 号' + (i + 1);
    obj.code = Math.floor(Math.random() * 3) + 1;
    obj.introduction = '介绍' + (i + 1);
    obj.contact_name = '联系人' + (i + 1);
    obj.contact_phone = '1350111111' + i;
    obj.cover_url = 'http://www.url.com/' + i;
    obj.created_time = new Date();
    obj.updated_time = null;

    data.push(obj);
  }

  // De letes ALL existing entries
  return knex('companies')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('companies').insert(data);
    });
};
