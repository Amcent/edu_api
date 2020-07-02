'use strict';

const Controller = require('egg').Controller;
const permissionGroup = require('../model/permission_group');
const Permission = require('../model/permission');

class permissionGroupController extends Controller {
  async index() {
    const { ctx } = this;
    const groups = await permissionGroup.all();
    const permissions = await Permission.all();

    groups.forEach(item => {
      item.children = [];

      permissions.forEach(data => {
        if (item.id === data.group_id) {
          item.children.push(data);
        }
      });
    });

    ctx.body = groups;
  }

  async show() {
    const { ctx } = this;
    const params = ctx.request.body;
    const permission = (await permissionGroup.show(params))[0];
    ctx.body = permission;
  }
}

module.exports = permissionGroupController;
