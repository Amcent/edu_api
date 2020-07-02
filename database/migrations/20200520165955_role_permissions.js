'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('role_permissions', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.integer('role_id').notNullable();
    table.string('permission_slug', 255).notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('role_permissions');
};
