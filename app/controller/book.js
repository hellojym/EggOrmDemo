'use strict';

const BaseController = require('./BaseController');

/**
 * 演示sequelize的增删改查
 */
class BookController extends BaseController {

  /**
   * 同步数据库
   * @returns {Promise<void>}
   */
  async index() {
    let ctx = this.ctx;
    ctx.body = await ctx.msmodel.Book.sync()
      .then(() => {
        return {
          error_code: 200,
          msg: '数据库同步成功',
        };
      });

  }

  /**
   * 传入书名，id 增加记录
   */
  async add() {
    const ctx = this.ctx;
    let id = ctx.query.id;
    let name = ctx.query.name;
    const result = await ctx.msmodel.Book.create({
      book_id: id,
      book_name: name,
      book_category: '0',
    });
    ctx.body = {
      error_code: 200,
      data: result
    };
  }

  /**
   * 根据id修改书名
   */
  async modify() {
    const ctx = this.ctx;
    try {
      let id = ctx.query.id;
      let book = await ctx.msmodel.Book.findByPk(id);
      if (!book) {
        ctx.body = {
          error_code: 333,
          error_msg: '找不到对应书'
        };
        return;
      }
      let updated = await book.update({
        book_name: '修改了名字',
      });
      ctx.body = {
        result: 'success',
        book: updated
      };
    } catch (e) {
      ctx.body = this.getErrorBody(e);
    }

  }


  /**
   * 删除第一条
   * @returns {Promise<void>}
   */
  async destroy() {
    const ctx = this.ctx;
    try {
      let book = await ctx.msmodel.Book.findAll();
      const res = await book[0].destroy();
      ctx.body = {
        data: res,
        error_msg: 'ok'
      };
    } catch (e) {
      ctx.body = this.getErrorBody(e);
    }

  }

  /**
   * 获取列表
   * @returns {Promise<void>}
   */
  async list() {
    const ctx = this.ctx;
    let result = await ctx.msmodel.Book.findAll();
    ctx.body = {
      error_code: 200,
      data: {
        bookList: result,
        item_first: result[0],
        item_first_get: result[0].get(),
      }
    };
  }
}

module.exports = BookController;
