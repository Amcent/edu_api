'use strict';

const Controller = require('egg').Controller;
const Path = require('../model/path');
const rules = {
  career_id: 'number',
  name: 'string',
  description: 'string',
  sort: { type: 'number', required: false },
};

class PathController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();

    ctx.validate(rules, ctx.request.body);

    const newPath = (await Path.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newPath } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Path.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Path.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await Path.sort(params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = PathController;
