'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('paths', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.integer('career_id').notNullable();
    table.string('name', 255).notNullable();
    table.string('description', 255).notNullable();
    table.integer('sort').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('paths');
};
