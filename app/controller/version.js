'use strict';

const Controller = require('egg').Controller;
const Version = require('../model/version');
const rules = {
  name: 'string',
  project_id: { type: 'number', required: false },
  sort: { type: 'number', required: false },
};

class VersionController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newVersion = (await Version.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newVersion } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, params);

    await Version.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Version.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await Version.sort(params);
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = VersionController;
