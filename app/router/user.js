'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const Auth = middleware.userAuth;

  // home
  router.get('/', Auth(), controller.home.index);

  // web login
  router.post('/api/sms/send', controller.auth.sms);
  router.post('/api/sms/login', controller.auth.smsLogin);

  // weChat login
  router.get('/api/auth/social/wechat/url', controller.wechat.oAuthWebUrl);
  router.get('/api/auth/social/wechat', controller.wechat.oAuthWeb);

  // qiniu token
  router.get('/api/qiniu/token', controller.qiniu.token);

  // user
  router.get('/api/user-info', Auth(), controller.user.show);
  router.put('/api/user-info', Auth(), controller.user.update);

  // bind
  router.put('/api/user/bind-phone', Auth(), controller.user.bindPhone);
  router.get('/api/user/bind-wechat', Auth(), controller.user.bindWechat);
  router.delete('/api/user/bind-wechat', Auth(), controller.user.unbindWechat);

  // course
  router.resources('course', '/api/course', Auth(), controller.course);
  router.get('/api/course-recommand', controller.course.recommand);
  router.resources('chapter', '/api/chapter', Auth(), controller.chapter);
  router.resources('section', '/api/section', Auth(), controller.section);
  router.get('/api/chapter/:id', Auth(), controller.chapter.show);
  router.get('/api/section/:id', Auth(), controller.section.show);

  // career
  router.resources('career', '/api/career', Auth(), controller.career);
  // router.get('/api/career/:id', Auth(), controller.career.show);
  // router.resources('path', '/api/admin/path', Auth(), controller.path);
  // router.put('/api/admin/sort/path', Auth(), controller.path.sort);
  // router.resources('career_course', '/api/admin/career_course', Auth(), controller.careerCourse);
  // router.put('/api/admin/sort/career_course', Auth(), controller.careerCourse.sort);

  // ability
  router.resources('ability', '/api/ability', Auth(), controller.ability);

  // question
  router.get('/api/question/:id', Auth(), controller.question.random);
};
