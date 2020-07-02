'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('stories', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.integer('version_id').notNullable();
    table.integer('project_id').notNullable();
    table.text('content').notNullable();
    table.integer('sort').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories');
};
