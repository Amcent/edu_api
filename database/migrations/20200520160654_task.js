'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.integer('project_id').notNullable();
    table.integer('version_id').notNullable();
    table.integer('story_id').notNullable();
    table.text('content').notNullable();
    table.integer('status').notNullable();
    table.integer('level').notNullable().comment('1-入门、2-初级、3-中级、4-高级');
    table.integer('platform').notNullable().comment('1-API、2-前台、3-后台、4-小程序');
    table.integer('sort').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
