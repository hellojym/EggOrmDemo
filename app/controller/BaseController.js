const Controller = require('egg').Controller;

/**
 * 演示mongo的增删改查
 *
 * mongoose里面操作不返回promise对象而是一个Query，为了方便使用await，需要在async函数里用Promise手动包起来
 */
class BaseController extends Controller {

  getErrorBody(e) {
    return {
      error_code: 444,
      error_msg: e.message
    };
  }
}

module.exports = BaseController;
