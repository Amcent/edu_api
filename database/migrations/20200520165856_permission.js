'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('permissions', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable();
    table.integer('group_id').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('permissions');
};
