'use strict';

const Controller = require('egg').Controller;
const Ability = require('../model/ability');
const rules = {
  name: 'string',
  description: 'string',
  slug: { type: 'string', required: false },
  tag_line: 'string',
  cover_url: 'string',
};

class AbilityController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;
    const abilities = await Ability.pagination(pageSize, currentPage);
    const total = (await Ability.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { abilities, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newAbility = (await Ability.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newAbility } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Ability.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Ability.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const ability = (await Ability.show({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: ability };
  }
}

module.exports = AbilityController;
