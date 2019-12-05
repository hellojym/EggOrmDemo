'use strict';

const BaseController = require('./BaseController');

/**
 * 演示sequelize的增删改查
 */
class BookController extends BaseController {

  /**
   * 同步数据库
   */
  async index() {
    const ctx = this.ctx;
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
    const id = ctx.query.id;
    const name = ctx.query.name;
    const result = await ctx.msmodel.Book.create({
      book_id: id,
      book_name: name,
      book_category: '0',
    });
    ctx.body = {
      error_code: 200,
      data: result,
    };
  }

  /**
   * 根据id修改书名
   */
  async modify() {
    const ctx = this.ctx;
    try {
      const id = ctx.query.id;
      const book = await ctx.msmodel.Book.findByPk(id);
      if (!book) {
        ctx.body = {
          error_code: 333,
          error_msg: '找不到对应书籍',
        };
        return;
      }
      const updated = await book.update({
        book_name: '修改了名字',
      });
      ctx.body = {
        result: 'success',
        book: updated,
      };
    } catch (e) {
      ctx.body = this.getErrorBody(e);
    }

  }


  /**
   * 删除第一条
   */
  async destroy() {
    const ctx = this.ctx;
    try {
      const book = await ctx.msmodel.Book.findAll();
      const res = await book[0].destroy();
      ctx.body = {
        data: res,
        error_msg: 'ok',
      };
    } catch (e) {
      ctx.body = this.getErrorBody(e);
    }

  }

  /**
   * 获取列表
   */
  async list() {
    const ctx = this.ctx;
    const result = await ctx.msmodel.Book.findAll();
    ctx.body = {
      error_code: 200,
      data: {
        bookList: result,
        item_first: result[0],
        item_first_get: result[0].get(),
      },
    };
  }
}

module.exports = BookController;
