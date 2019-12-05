'use strict';

const Controller = require('egg').Controller;

/**
 * 演示mysql的增删改查
 */
class HomeController extends Controller {

  /**
   * 同步数据库
   * @returns {Promise<void>}
   */
  async index() {
    let ctx = this.ctx;
    (async () => {
      const dog = await ctx.msmodel.Book.sync();
    })();
  }

  /**
   * 增
   */
  async add() {
    const ctx = this.ctx;
    let id = ctx.query.id;
    (async () => {
      const dog = await ctx.msmodel.Book.create({
        book_id: id,
        book_name: '测试',
        book_category: '0',
      });
    })();
  }

  /**
   * 修改单条
   * @returns {Promise<void>}
   */
  async modify() {
    const ctx = this.ctx;
    ctx.body = await this.modifyName(ctx);
  }

  async modifyName(ctx) {
    let book = await ctx.msmodel.Book.findByPk('001');
    await book.update({
      book_name: '再次修改',
    });
    return {
      result: 'success',
      book: book
    };
  }


  /**
   * 删除第一条
   * @returns {Promise<void>}
   */
  async destroy() {
    const ctx = this.ctx;
    try {
      let book = await ctx.msmodel.Book.findAll();
      await book[0].destroy();
      ctx.body = {
        error_msg: 'ok'
      };
    } catch (e) {
      ctx.body = {
        error_msg: e
      };
    }

  }

  /**
   * 获取列表
   * @returns {Promise<void>}
   */
  async list() {
    const ctx = this.ctx;
    let f = async () => {
      return await ctx.msmodel.Book.findAll({
        where: {
          book_name: '测试',
        }
      });
    };
    let result = await f();
    ctx.body = {
      error_code: 200,
      data: {
        bookList: result,
        item: result[0],
        item1: result[0].get(),
      }
    };
  }
}

module.exports = HomeController;
