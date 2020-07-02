'use strict';

const Controller = require('egg').Controller;
const Permission = require('../model/permission');

class PermissionController extends Controller {
  async index() {
    const { ctx } = this;
    const permissions = await Permission.all();

    ctx.body = permissions;
  }

  async show() {
    const { ctx } = this;
    const params = ctx.request.body;
    const permission = (await Permission.show(params))[0];
    ctx.body = permission;
  }
}

module.exports = PermissionController;
