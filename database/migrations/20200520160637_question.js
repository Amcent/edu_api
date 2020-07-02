'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('questions', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.text('stem').notNullable();
    table.integer('ability_id').notNullable();
    table.integer('level').notNullable();
    table.text('option').notNullable();
    table.integer('answer').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('questions');
};
