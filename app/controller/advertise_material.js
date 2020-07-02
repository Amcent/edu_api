'use strict';

const Controller = require('egg').Controller;
const advertiseMaterial = require('../model/advertise_material');
const rules = {
  advertise_id: 'number',
  material_id: 'number',
  sort: 'number',
};

class advertiseMaterialController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const advertiseMaterias = await advertiseMaterial.pagination(pageSize, currentPage);
    const total = (await advertiseMaterial.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { advertiseMaterias, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newadvertiseMaterial = (await advertiseMaterial.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newadvertiseMaterial } };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const advertiseMateria = (await advertiseMaterial.show({ id }))[0];
    ctx.body = { error_code: 0, message: 'success', data: advertiseMateria };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await advertiseMaterial.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await advertiseMaterial.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async sort() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log('advertiseMaterialController -> sort -> params', params);

    const sortedAdvertiseMaterial = await advertiseMaterial.sort(params);
    console.log('advertiseMaterialController -> sort -> sortedAdvertiseMaterial', sortedAdvertiseMaterial);

    ctx.body = { error_code: 0, message: 'success', data: sortedAdvertiseMaterial };
  }
}

module.exports = advertiseMaterialController;
