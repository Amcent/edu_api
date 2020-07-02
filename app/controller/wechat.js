'use strict';

const Controller = require('egg').Controller;

class wechatController extends Controller {
  async oAuthWebUrl() {
    const { ctx } = this;
    const wechatOAuthUrl = await ctx.service.wechat.oAuthWebUrl();
    console.log('wechatController -> oAuthWebUrl -> wechatOAuthUrl', wechatOAuthUrl);
    ctx.body = { error_code: 0, message: 'success', data: { redirect: wechatOAuthUrl } };
  }

  async oAuthWeb() {
    const { ctx } = this;
    const code = ctx.query.code;
    console.log('wechatController -> oAuthWeb -> code', code);

    if (!code) {
      ctx.body = { error_code: 1, message: 'need code' };
      return;
    }

    const userInfo = await ctx.service.wechat.oAuthWeb(code);
    const { user, token } = await ctx.service.wechat.token(userInfo);
    ctx.body = { error_code: 0, message: 'success', data: { user, token } };
  }
}

module.exports = wechatController;
