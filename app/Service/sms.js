'use strict';

const Service = require('egg').Service;
const SmsLog = require('../model/sms_logs');

class smsService extends Service {
  async verify(smsLog, code) {
    if (!smsLog.code) {
      return { error_code: 1, message: '请重新获取验证码' };
    }

    if (smsLog.code !== code) {
      return { error_code: 1, message: '验证码错误' };
    }

    await SmsLog.update(smsLog.id, { status: 1 });
    return { error_code: 0, message: 'success' };
  }
}

module.exports = smsService;
