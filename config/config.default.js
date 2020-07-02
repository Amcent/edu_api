/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

require('dotenv').config();

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589696757208_621';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: [ 'http://localhost:8080' ],
    },
  };

  config.jwt = {
    secret: process.env.JWT_SECRET,
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.wechat = {
    web: {
      redirectUrl: process.env.WECHAT_REDIRECT_URL,
      appid: process.env.WECHAT_WEB_APPID,
      secret: process.env.WECHAT_WEB_SECRET,
    },
  };

  config.qiniu = {
    accessKey: process.env.QINIU_ACCESS_KEY,
    secretKey: process.env.QINIU_SECRET_KEY,
    bucket: process.env.QINIU_BUCKET,
    domain: process.env.QINIU_DOMAIN,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
