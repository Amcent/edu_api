'use strict';

const Controller = require('egg').Controller;
const Material = require('../model/material');
const rules = {
  name: 'string',
  content: 'string',
  jump_url: 'string',
  new_tab: 'number',
};

class MaterialController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const materials = await Material.pagination(pageSize, currentPage);
    const total = (await Material.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { materials, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newMaterial = (await Material.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newMaterial } };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const material = (await Material.show({ id }))[0];

    if (!material) {
      ctx.body = { error_code: 1, message: '没有此物料' };
      return;
    }

    ctx.body = { error_code: 0, message: 'success', data: material };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Material.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Material.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;

    const sortedMaterial = await Material.sort(params);

    ctx.body = { error_code: 0, message: 'success', data: sortedMaterial };
  }
}

module.exports = MaterialController;
