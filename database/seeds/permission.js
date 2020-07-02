'use strict';

exports.seed = function(knex) {
  const data = [
    { name: '路径管理', slug: 1, group_id: 1 },
    { name: '课程管理', slug: 2, group_id: 1 },
    { name: '企业管理', slug: 3, group_id: 2 },
    { name: '项目管理', slug: 4, group_id: 2 },
    { name: '技能管理', slug: 5, group_id: 3 },
    { name: '题目管理', slug: 6, group_id: 3 },
    { name: '管理员管理', slug: 7, group_id: 4 },

  ];

  data.forEach(item => {
    item.created_time = new Date();
    item.updated_time = null;
  });

  // De letes ALL existing entries
  return knex('permissions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('permissions').insert(data);
    });
};
