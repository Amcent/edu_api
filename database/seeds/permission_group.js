'use strict';

exports.seed = function(knex) {
  const data = [
    { name: '职业课程' },
    { name: '项目管理' },
    { name: '测评管理' },
    { name: '权限管理' },
  ];

  data.forEach(item => {
    item.created_time = new Date();
    item.updated_time = null;
  });

  // De letes ALL existing entries
  return knex('permission_groups')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permission_groups').insert(data);
    });
};
