'use strict';

const Controller = require('egg').Controller;
const User = require('../model/user');
const SmsLog = require('../model/sms_logs');
const smsRule = {
  phone: { type: 'string', required: true },
  code: { type: 'string', required: true },
};

class UserController extends Controller {
  async show() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const user = (await User.show({ id }))[0];
    ctx.body = { error_code: 0, message: 'success', data: user };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('UserController -> update -> params', params);
    const id = ctx.locals.user_id;

    await User.update(id, params);
    ctx.body = { error_code: 0, message: 'success' };
  }

  async bindPhone() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);

    const smsLog = (await SmsLog.having({ phone })).slice(-1)[0];
    const verify = await ctx.service.sms.verify(smsLog, code);

    if (verify.error_code) {
      ctx.body = verify;
      return;
    }

    const id = ctx.locals.user_id;

    await User.update(id, { phone });
    ctx.body = { error_code: 0, message: 'success' };
  }

  async bindWechat() {
    const { ctx } = this;
    const code = ctx.query.code;
    console.log('UserController -> bindWechat -> code', code);

    if (!code) {
      ctx.body = { error_code: 1, message: 'need code' };
      return;
    }

    const userInfo = await ctx.service.wechat.oAuthWeb(code);
    const union_id = userInfo.union_id;
    const id = ctx.locals.user_id;

    const user = (await User.where({ union_id }))[0];

    if (user) {
      ctx.body = { error_code: 1, message: '此微信号已被绑定，请解绑再进行重新绑定' };
      return;
    }

    await User.update(id, { union_id });
    ctx.body = { error_code: 0, message: 'success', data: union_id };
  }

  async unbindWechat() {
    const { ctx } = this;
    const id = ctx.locals.user_id;
    const union_id = '';

    await User.update(id, { union_id });
    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = UserController;
