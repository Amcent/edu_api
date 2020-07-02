'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const Auth = middleware.adminAuth;

  // home
  router.get('/', controller.home.index);

  // qiniu
  router.get('/api/admin/qiniu/token', controller.qiniu.token);

  // login
  router.post('/api/admin/sms/send', controller.auth.sms);
  router.post('/api/admin/sms/login', controller.auth.adminLogin);
  router.get('/api/admin/auth/permissions', Auth(), controller.auth.permissions);

  // course
  router.resources('course', '/api/admin/course', Auth(), controller.course);
  router.resources('chapter', '/api/admin/chapter', Auth(), controller.chapter);
  router.put('/api/admin/sort/chapter', Auth(), controller.chapter.sort);
  router.resources('section', '/api/admin/section', Auth(), controller.section);
  router.put('/api/admin/sort/section', Auth(), controller.section.sort);

  // career
  router.resources('career', '/api/admin/career', Auth(), controller.career);
  router.resources('path', '/api/admin/path', Auth(), controller.path);
  router.put('/api/admin/sort/path', Auth(), controller.path.sort);
  router.resources('career_course', '/api/admin/career_course', Auth(), controller.careerCourse);
  router.put('/api/admin/sort/career_course', Auth(), controller.careerCourse.sort);

  // company
  router.resources('company', '/api/admin/company', Auth(), controller.company);

  // project
  router.resources('project', '/api/admin/project', Auth(), controller.project);
  router.resources('version', '/api/admin/version', Auth(), controller.version);
  router.put('/api/admin/sort/version', Auth(), controller.version.sort);
  router.resources('story', '/api/admin/story', Auth(), controller.story);
  router.put('/api/admin/sort/story', Auth(), controller.story.sort);
  router.resources('task', '/api/admin/task', Auth(), controller.task);
  router.put('/api/admin/sort/task', Auth(), controller.task.sort);

  // ability
  router.resources('ability', '/api/admin/ability', Auth(), controller.ability);

  // question
  router.resources('question', '/api/admin/question', Auth(), controller.question);

  // manager
  router.resources('manager', '/api/admin/manager', Auth(), controller.manager);

  // role
  router.resources('role', '/api/admin/role', Auth(), controller.role);

  // permission
  router.resources('permission_groups', '/api/admin/permission_groups', Auth(), controller.permissionGroup);
  router.resources('permission', '/api/admin/permission', Auth(), controller.permission);
  router.resources('role_permission', '/api/admin/role_permission', Auth(), controller.rolePermission);

  // advertise
  router.resources('advertise', '/api/admin/advertise', Auth(), controller.advertise);
  router.resources('material', '/api/admin/material', Auth(), controller.material);
  router.resources('advertise_material', '/api/admin/advertise_material', Auth(), controller.advertiseMaterial);
  router.put('/api/admin/sort/advertise_material', Auth(), controller.advertiseMaterial.sort);
};
