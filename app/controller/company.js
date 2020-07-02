'use strict';

const Controller = require('egg').Controller;
const Company = require('../model/company');
const rules = {
  name: 'string',
  short_name: 'string',
  slogan: 'string',
  code: 'string',
  introduction: 'string',
  contact_name: 'string',
  contact_phone: 'string',
  cover_url: 'string',
};

class CompanyController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const companies = await Company.pagination(pageSize, currentPage);
    const total = (await Company.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { companies, total } };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const company = (await Company.show({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: company };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newCompany = (await Company.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: newCompany };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Company.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Company.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }
}

module.exports = CompanyController;
