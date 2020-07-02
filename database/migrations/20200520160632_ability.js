'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('abilities', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable();
    table.string('tag_line').notNullable();
    table.string('cover_url', 255).notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('abilities');
};
