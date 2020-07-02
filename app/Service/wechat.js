'use strict';

const Service = require('egg').Service;
const User = require('../model/user');
const { Wechat } = require('wechat-jssdk');
const wx = new Wechat({
  wechatRedirectUrl: process.env.WECHAT_REDIRECT_URL,
  appId: process.env.WECHAT_WEB_APPID,
  appSecret: process.env.WECHAT_WEB_SECRET,
});

class wechatService extends Service {
  async oAuthWebUrl() {
    const { app, ctx } = this;
    const redirectUrl = ctx.query.redirect_url || app.config.wechat.web.redirectUrl;
    const appId = app.config.wechat.web.appid;
    const weChatReqUrl = 'https://open.weixin.qq.com/connect/qrconnect';
    const weChatReqQuery = `appid=${appId}&redirect_uri=${redirectUrl}`;
    const weChatState = 'response_type=code&scope=snsapi_login&state=wechatloginforedupro#wechat_redirect';

    return `${weChatReqUrl}?${weChatReqQuery}&${weChatState}`;
  }

  async oAuthWeb(code) {
    const { app } = this;
    const userInfo = await wx.oauth.getUserInfo(code);

    return {
      appid: app.config.wechat.web.appid,
      openid: userInfo.openid,
      union_id: userInfo.unionid,
      name: userInfo.nickname,
      avatar_url: userInfo.headimgurl,
      sex: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
    };
  }

  async token(userInfo) {
    const { ctx } = this;
    const theUser = {
      union_id: userInfo.union_id,
      name: userInfo.name,
      avatar_url: userInfo.avatar_url,
      sex: userInfo.sex,
    };

    const user = await User.findOrCreate({ union_id: theUser.union_id }, theUser);
    await User.update(user.id, { last_visit_at: new Date() });
    const token = await ctx.service.jwt.sign(user.id);

    return { user, token };
  }
}
module.exports = wechatService;
