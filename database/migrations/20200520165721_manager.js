'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('managers', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('phone', 255).notNullable();
    table.integer('role_id').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('managers');
};
