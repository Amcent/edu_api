'use strict';

const Controller = require('egg').Controller;
const Chapter = require('../model/chapter');
const Section = require('../model/section');
const rules = {
  name: 'string',
  course_id: { type: 'number', required: false },
  sort: { type: 'number', required: false },
};

class ChapterController extends Controller {
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);
    const newChapter = (await Chapter.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newChapter } };
  }

  async update() {
    const { ctx } = this;
    const name = ctx.request.body.name;
    const id = ctx.params.id;

    ctx.validate(rules, ctx.request.body);
    await Chapter.update(id, { name });

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Chapter.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const chapter = (await Chapter.where({ id }))[0];
    const section = await Section.where({ chapter_id: id });

    chapter.children = section;
    ctx.body = { error_code: 0, message: 'success', data: chapter };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    await Chapter.sort(params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = ChapterController;
