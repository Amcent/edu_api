'use strict';

const Controller = require('egg').Controller;
const Course = require('../model/course');
const Chapter = require('../model/chapter');
const rules = {
  name: 'string',
  title: 'string',
  tips: 'string',
  cover_url: 'string',
  description: 'string',
  status: 'number',
};

class CourseController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const courses = await Course.pagination(pageSize, currentPage);
    const total = (await Course.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { courses, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    params.status = 0;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);
    const newCourse = await Course.insert(params);

    ctx.body = { error_code: 0, message: 'success', data: { id: newCourse } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;

    ctx.validate(rules, ctx.request.body);
    await Course.update(id, params);
    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Course.delete(id);
    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const course = (await Course.show({ id }))[0];
    const chapters = await Chapter.show({ course_id: id });
    const sections = await Chapter.cross('sections', 'chapter_id', chapters);

    chapters.forEach(item => {
      item.children = [];

      sections.forEach(data => {
        const match = data.some(param => param.chapter_id === item.id);
        if (match) {
          item.children = data;
        }
      });
      item.children.sort((a, b) => {
        return a.sort - b.sort;
      });
    });

    chapters.sort((a, b) => {
      return a.sort - b.sort;
    });
    course.children = chapters;
    ctx.body = { error_code: 0, message: 'success', data: course };
  }

  async recommand() {
    const { ctx } = this;
    const count = ctx.query.count;

    const courses = await Course.recommand(count);

    ctx.body = { error_code: 0, message: 'success', data: courses };
  }
}

module.exports = CourseController;
