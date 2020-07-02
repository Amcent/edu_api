'use strict';

const Controller = require('egg').Controller;
const Question = require('../model/question');
const Ability = require('../model/ability');
const rules = {
  stem: 'string',
  ability_id: 'number',
  level: 'number',
  option: 'string',
  answer: 'number',
};

class QuestionController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;
    const questions = await Question.joinAbility(pageSize, currentPage);
    const total = (await Question.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { questions, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newQuestion = await Question.insert(params);
    ctx.body = { error_code: 0, message: 'success', data: { id: newQuestion } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(rules, ctx.request.body);

    await Question.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Question.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;

    const question = (await Question.show({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: question };
  }

  async random() {
    const { ctx } = this;
    const id = ctx.params.id;

    const questions = await Question.where({ ability_id: id });
    const ability = (await Ability.where({ id }))[0];

    ctx.body = { error_code: 0, message: 'success', data: { ability, questions, total: questions.length } };
  }
}

module.exports = QuestionController;
