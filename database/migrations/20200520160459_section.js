'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('sections', function(table) {
    table.charset('utf8');
    table.increments('id');
    table.integer('chapter_id').notNullable();
    table.string('name', 255).notNullable();
    table.text('content', 255).notNullable();
    table.string('video_url', 255).notNullable();
    table.integer('sort').notNullable();
    table.datetime('created_time');
    table.datetime('updated_time');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sections');
};
