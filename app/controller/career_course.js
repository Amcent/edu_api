'use strict';

const Controller = require('egg').Controller;
const CareerCourse = require('../model/career_course');
const rules = {
  career_id: 'number',
  path_id: 'number',
  course_id: 'number',
  sort: 'number',
};

class CareerCourseController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    await CareerCourse.insert(params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await CareerCourse.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await CareerCourse.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await CareerCourse.sort(params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = CareerCourseController;
