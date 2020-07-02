'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('permission_groups', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('permission_groups');
};
