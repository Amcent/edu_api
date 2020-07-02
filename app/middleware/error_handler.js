'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      let message = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      message = message || err.errmsg;
      ctx.body = { message };

      if (status === 422) {
        ctx.body = {
          error_code: 1,
          message: `${err.errors[0].field} ${err.errors[0].message}`,
          data: err.errors.map(data => {
            return `${data.field} ${data.message}`;
          }),
        };
      }

      ctx.status = status;
    }
  };
};
