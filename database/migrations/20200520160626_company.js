'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('companies', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('short_name', 255).notNullable();
    table.string('slogan', 255).notNullable();
    table.string('code', 255).notNullable();
    table.text('introduction').notNullable();
    table.string('contact_name', 255).notNullable();
    table.string('contact_phone', 255).notNullable();
    table.string('cover_url', 255).notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
