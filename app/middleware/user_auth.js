'use strict';

module.exports = () => {
  return async function userAuth(ctx, next) {
    const { app } = ctx;
    const token = ctx.header.authorization ? ctx.headers.authorization.split(' ')[1] : '';

    if (!token) {
      ctx.status = 401;
      ctx.body = { error_code: 1, message: 'Auth empty' };
      return;
    }

    try {
      const decoded = app.jwt.verify(token, app.config.jwt.secret);
      const user_id = decoded.user_id;

      ctx.locals.user_id = user_id;
    } catch (e) {
      ctx.status = 401;
      ctx.body = { error_code: 1, message: e };
      return;
    }

    await next();
  };
};
