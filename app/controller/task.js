'use strict';

const Controller = require('egg').Controller;
const Task = require('../model/task');
const rules = {
  name: { type: 'string', required: false },
  project_id: { type: 'number', required: false },
  version_id: { type: 'number', required: false },
  story_id: { type: 'number', required: false },
  content: { type: 'string', required: false },
  status: { type: 'number', required: false },
  level: { type: 'number', required: false },
  platform: { type: 'number', required: false },
  sort: { type: 'number', required: false },
};

class TaskController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.status = 0;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newTask = (await Task.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newTask } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, params);

    await Task.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Task.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await Task.sort(params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = TaskController;
