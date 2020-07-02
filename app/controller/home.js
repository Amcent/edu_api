'use strict';

const Controller = require('egg').Controller;
const User = require('../model/user');

class HomeController extends Controller {

  async index() {
    const { ctx } = this;
    const user = await User.all();
    ctx.body = user;
  }

  // async index() {
  //   const { ctx } = this;
  //   ctx.body = 'hi, egg';
  // }
}

module.exports = HomeController;
