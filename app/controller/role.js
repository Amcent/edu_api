'use strict';

const Controller = require('egg').Controller;
const Role = require('../model/role');
const RolePermission = require('../model/role_permission');
const rules = {
  name: 'string',
  description: 'string',
};

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;
    const roles = await Role.pagination(pageSize, currentPage);
    const total = (await Role.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { roles, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newRole = (await Role.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newRole } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Role.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Role.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const role = (await Role.show({ id }))[0];
    const permissions = (await RolePermission.show({ role_id: id }))[0];

    role.permissions = permissions.permission_slug;
    role.permission_id = permissions.id;
    ctx.body = { error_code: 0, message: 'success', data: role };
  }
}

module.exports = RoleController;
