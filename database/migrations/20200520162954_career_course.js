'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('career_course', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.integer('career_id').notNullable();
    table.integer('path_id').notNullable();
    table.integer('course_id').notNullable();
    table.integer('sort').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('career_course');
};
