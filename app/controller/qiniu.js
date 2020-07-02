'use strict';

const Controller = require('egg').Controller;

class qiniuController extends Controller {
  async token() {
    const { ctx } = this;
    const { domain, token } = await ctx.service.qiniu.token();

    ctx.body = { error_code: 0, message: 'success', data: { domain, token } };
  }
}

module.exports = qiniuController;
