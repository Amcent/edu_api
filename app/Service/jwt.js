'use strict';

const Service = require('egg').Service;

class jwtService extends Service {
  async sign(id) {
    return this.app.jwt.sign({ user_id: id }, this.app.config.jwt.secret, { expiresIn: '7d' });
  }
}

module.exports = jwtService;
