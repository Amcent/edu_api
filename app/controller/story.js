'use strict';

const Controller = require('egg').Controller;
const Story = require('../model/story');
const rules = {
  name: 'string',
  project_id: { type: 'number', required: false },
  version_id: { type: 'number', required: false },
  content: { type: 'string', required: false },
  sort: { type: 'number', required: false },
};

class StoryController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newStory = (await Story.insert(params))[0];
    ctx.body = { error_code: 0, message: 'success', data: { id: newStory } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, params);

    await Story.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Story.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await Story.sort(params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = StoryController;
