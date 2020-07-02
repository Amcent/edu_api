'use strict';

const Controller = require('egg').Controller;
const Manager = require('../model/manager');
const rules = {
  name: 'string',
  phone: 'string',
  role_id: 'number',
};

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;
    const managers = await Manager.joinRole(pageSize, currentPage);
    const total = (await Manager.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { managers, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newManager = await Manager.insert(params);

    ctx.body = { error_code: 0, message: 'success', data: { id: newManager } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Manager.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Manager.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const manager = (await Manager.show({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: manager };
  }
}

module.exports = ManagerController;
