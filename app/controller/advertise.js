'use strict';

const Controller = require('egg').Controller;
const Advertise = require('../model/advertise');
const AdvertiseMaterial = require('../model/advertise_material');
const rules = {
  name: 'string',
  slug: 'string',
  widthSize: 'string',
  heightSize: 'string',
};

class AdvertiseController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const advertises = await Advertise.pagination(pageSize, currentPage);
    const total = (await Advertise.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { advertises, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newAdvertise = (await Advertise.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newAdvertise } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Advertise.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Advertise.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const advertise = (await Advertise.show({ id }))[0];
    const advertiseMaterials = await AdvertiseMaterial.where({ 'advertise_material.advertise_id': id });
    const materials = await Advertise.joinMaterial(advertiseMaterials);

    advertise.children = [];
    materials.forEach(item => {
      item.forEach(data => {
        advertise.children.push(data);
      });
    });

    advertise.children.forEach(item => {
      advertiseMaterials.forEach(data => {
        if (item.id === data.material_id) {
          item.advertise_materials_id = data.id;
          item.sort = data.sort;
        }
      });
    });

    ctx.body = { error_code: 0, message: 'success', data: advertise };
  }
}

module.exports = AdvertiseController;
