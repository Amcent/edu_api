'use strict';

const Manager = require('../model/manager');
const RolePermission = require('../model/role_permission');

module.exports = () => {
  return async function adminAuth(ctx, next) {
    const { app } = ctx;
    const token = ctx.request.header.authorization ? ctx.request.header.authorization.split(' ')[1] : '';

    if (!token) {
      ctx.status = 401;
      ctx.body = { error_code: 1, message: 'Auth empty' };
      return;
    }

    try {
      const decoded = app.jwt.verify(token, app.config.secret);
      const user_id = decoded.user_id;
      const manager = (await Manager.show({ id: user_id }))[0];
      ctx.locals.user_id = user_id;

      if (!manager) {
        ctx.status = 403;
        ctx.body = { error_code: 1, message: 'No Auth Manager' };
        return;
      }

      const permissions = (await RolePermission.show({ role_id: manager.role_id }))[0];
      const permission = permissions.permission_slug;
      ctx.locals.permissions = permissions.permission_slug;

      if (permission.length === 0) {
        ctx.status = 403;
        ctx.body = { error_code: 1, message: 'No Auth Permission' };
        return;
      }
    } catch (e) {
      ctx.status = 401;
      ctx.body = { error_code: 1, message: e };
      return;
    }

    await next();
  };
};
