'use strict';

const basicModel = require('./base.js');
const config = require('../../knexfile.js');
const knex = require('knex')(config);

class chapterModel extends basicModel {
  constructor(props = 'career_course') {
    super(props);
  }

  showCourse(id) {
    return knex('career_course')
      .where('career_id', id)
      .join('courses', 'career_course.course_id', '=', 'courses.id')
      .select('career_course.id', 'course_id', 'path_id', 'name', 'sort', 'description', 'cover_url');
  }
}

module.exports = new chapterModel();
