'use strict';

const Controller = require('egg').Controller;
const Project = require('../model/project');
const Version = require('../model/version');
const Story = require('../model/story');
const Task = require('../model/task');
const rules = {
  name: 'string',
  description: 'string',
  status: 'number',
  cover_url: { type: 'string', required: false },
};

class ProjectController extends Controller {
  async index() {
    const { ctx } = this;
    const pageSize = ctx.query.pageSize;
    const currentPage = ctx.query.currentPage;

    const projects = await Project.pagination(pageSize, currentPage);
    const total = (await Project.count('id as total'))[0];

    ctx.body = { error_code: 0, message: 'success', data: { projects, total } };
  }

  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.status = 0;
    params.created_at = new Date();
    ctx.validate(rules, ctx.request.body);

    const newProject = (await Project.insert(params))[0];

    ctx.body = { error_code: 0, message: 'success', data: { id: newProject } };
  }

  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate({ name: rules.name, description: rules.description, cover_url: rules.cover_url }, ctx.request.body);

    await Project.update(id, params);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;

    await Project.delete(id);

    ctx.body = { error_code: 0, message: 'success' };
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const project = (await Project.show({ id }))[0];
    const versions = await Version.show({ project_id: id });
    const stories = await Story.show({ project_id: id });
    const tasks = await Task.show({ project_id: id });
    project.children = [];

    versions.forEach(version => {
      version.children = [];

      stories.forEach(story => {
        if (story.version_id === version.id) {
          story.children = [];

          tasks.forEach(task => {
            if (story.id === task.story_id && version.id === task.version_id) {
              story.children.push(task);
            }
          });

          version.children.push(story);
          story.children.sort((a, b) => {
            return a.sort - b.sort;
          });
        }
      });

      version.children.sort((a, b) => {
        return a.sort - b.sort;
      });
      project.children.push(version);
    });

    project.children.sort((a, b) => {
      return a.sort - b.sort;
    });
    ctx.body = { error_code: 0, message: 'success', data: project };
  }
}

module.exports = ProjectController;
