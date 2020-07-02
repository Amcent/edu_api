'use strict';

const Controller = require('egg').Controller;
const SmsLog = require('../model/sms_logs');
const Manager = require('../model/manager');
const User = require('../model/user');
const smsRule = {
  phone: { type: 'string', required: true },
  code: { type: 'string', required: true },
};

class authController extends Controller {
  async sms() {
    const { ctx } = this;
    const code = Math.random().toString().slice(2, 8);
    const phone = ctx.request.body.phone;
    ctx.validate({ phone: smsRule.phone }, ctx.request.body);

    const params = {
      code,
      phone,
      status: 0,
      template: 'SMS_173660228',
      content: `验证码${code}，您正在登录，若非本人操作，请勿泄露。`,
      created_time: new Date(),
    };

    await SmsLog.insert(params);
    ctx.body = { error_code: 0, message: 'success', data: code };
  }

  async adminLogin() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);

    const smsLog = (await SmsLog.having({ phone })).slice(-1)[0];
    const verify = await ctx.service.sms.verify(smsLog, code);

    if (verify.error_code) {
      ctx.body = verify;
      return;
    }

    const manager = (await Manager.show({ phone }))[0];

    if (!manager) {
      ctx.body = { error_code: 1, message: '该用户不存在，请联系管理员' };
      return;
    }

    const token = await ctx.service.jwt.sign(manager.id);
    ctx.body = {
      error_code: 0,
      message: 'success',
      data: { manager, token },
    };
  }

  async permissions() {
    const { ctx } = this;
    const permissions = ctx.locals.permissions;
    ctx.body = { error_code: 0, message: 'success', data: permissions };
  }

  async smsLogin() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;
    ctx.validate(smsRule, ctx.request.body);

    const smsLog = (await SmsLog.having({ phone })).slice(-1)[0];
    const verify = await ctx.service.sms.verify(smsLog, code);

    if (verify.error_code) {
      ctx.body = verify;
      return;
    }

    const theUser = {
      name: '用户' + phone,
      phone,
    };

    const user = (await User.findOrCreate({ phone: theUser.phone }, theUser))[0];
    const id = user.id;
    await User.update(id, { last_visit_at: new Date() });
    const token = await ctx.service.jwt.sign(id);

    ctx.body = {
      error_code: 0,
      message: 'success',
      data: { user, token },
    };
  }
}

module.exports = authController;
