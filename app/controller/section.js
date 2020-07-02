'use strict';

const Controller = require('egg').Controller;
const Section = require('../model/section');
const rules = {
  name: { type: 'string', required: false },
  chapter_id: { type: 'number', required: false },
  sort: { type: 'number', required: false },
  content: { type: 'string', required: false },
  video_url: { type: 'string', required: false },
};

class SectionController extends Controller {
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const section = (await Section.show({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: section };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;

    params.created_at = new Date();
    ctx.validate({ name: rules.name, chapter_id: rules.chapter_id, sort: rules.sort }, ctx.request.body);
    const newSection = (await Section.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newSection } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;

    ctx.validate(rules, ctx.request.body);
    await Section.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Section.delete(id);
    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const sections = ctx.request.body;

    await Section.sort(sections);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = SectionController;
