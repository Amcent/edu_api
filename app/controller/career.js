'use strict';

const Controller = require('egg').Controller;
const Career = require('../model/career');
const Path = require('../model/path');
const CareerCourse = require('../model/career_course');
const careerRule = {
  name: 'string',
  cover_url: 'string',
  description: 'string',
  status: 'number',
};

class CareerController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;
    const careers = await Career.pagination(pageSize, currentPage);
    const total = (await Career.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { careers, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.status = 0;
    params.created_at = new Date();

    ctx.validate(careerRule, ctx.request.body);

    const newCareer = (await Career.insert(params))[0];
    ctx.body = { error_code: 0, message: 'success', data: { id: newCareer } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(careerRule, ctx.request.body);

    await Career.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Career.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const career = (await Career.show({ id }))[0];
    const paths = await Path.show({ career_id: id });
    const courses = await CareerCourse.showCourse(id);

    paths.forEach(item => {
      item.children = [];

      courses.forEach(data => {
        if (data.path_id === item.id) {
          item.children.push(data);
        }
      });

      item.children.sort((a, b) => {
        return a.sort - b.sort;
      });
    });

    paths.sort((a, b) => {
      return a.sort - b.sort;
    });
    career.children = paths;
    ctx.body = { error_code: 0, message: 'success', data: career };
  }
}

module.exports = CareerController;
