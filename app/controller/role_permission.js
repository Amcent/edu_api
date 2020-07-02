'use strict';

const Controller = require('egg').Controller;
const RolePermission = require('../model/role_permission');
const rules = {
  role_id: 'number',
  permission_slug: 'string',
};

class RolePermissionController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const rolePermissions = await RolePermission.joinAbility(pageSize, currentPage);
    const total = (await RolePermission.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { rolePermissions, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newRolePermission = await RolePermission.insert(params);

    ctx.body = { error_code: 0, message: 'success', data: { id: newRolePermission } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate({ permission_slug: rules.permission_slug }, ctx.request.body);

    await RolePermission.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = RolePermissionController;
