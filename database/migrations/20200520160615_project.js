'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('projects', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description', 255).notNullable();
    table.text('content').notNullable();
    table.string('cover_url', 255).notNullable();
    table.integer('status').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
