'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // sequelize演示
  router.get('/book', controller.book.index);
  router.get('/book/add', controller.book.add);
  router.get('/book/modify', controller.book.modify);
  router.get('/book/list', controller.book.list);
  router.get('/book/destroy', controller.book.destroy);

  // mongoose演示
  router.get('/student/add', controller.student.add);
  router.get('/student/update', controller.student.update);
  router.get('/student/remove', controller.student.remove);
  router.get('/student/removeAll', controller.student.removeAll);
  router.get('/student/find', controller.student.find);
  router.get('/student/list', controller.student.list);
};
