'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/add', controller.home.add);
  router.get('/modify', controller.home.modify);
  router.get('/list', controller.home.list);
  router.get('/destroy', controller.home.destroy);

  router.get('/student/add', controller.student.add);
  router.get('/student/update', controller.student.update);
  router.get('/student/remove', controller.student.remove);
  router.get('/student/removeAll', controller.student.removeAll);
  router.get('/student/find', controller.student.find);
  router.get('/student/list', controller.student.list);
};
