'use strict';

const Controller = require('egg').Controller;

/**
 * 演示mongo的增删改查
 *
 * mongoose跟sequelize不同在于，它是通过回调来处理结果的，为了能够用await和async，需要将其包在Promise中，这样就能
 * 在controller的函数中await它，从而等待其获取结果。
 */
class StudentController extends Controller {

  /**
   * 增加
   */
  async add() {
    const ctx = this.ctx;
    const name = ctx.query.name;
    const id = ctx.query.id;
    try {
      const Student = ctx.model.Student;
      const s = new Student({
        id,
        name,
        age: 22,
        subjects: [ 2, 4, 1, 6, 3 ],
      });
      ctx.body = await new Promise(resolve => {
        s.save((error, res) => {
          if (error) {
            resolve({
              msg: error,
              error_code: 400,
            });
          }
          resolve({
            msg: 'ok',
            data: res,
            error_code: 200,
          });

        });
      });
    } catch (e) {
      ctx.body = {
        error: true,
        msg: e,
      };
    }
  }


  /**
   * 通过id查找记录
   */
  async find() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const Student = this.ctx.model.Student;
    ctx.body = await new Promise(resolve => {
      Student.findOne({
        id,
      }, (err, res) => {
        if (res) {
          resolve({
            error_code: 200,
            data: res,
          });
        } else {
          resolve({
            error_code: 400,
            data: err,
          });
        }
      });
    });

  }

  /**
   * 返回年龄符合的list
   */
  async list() {
    const ctx = this.ctx;
    const Student = this.ctx.model.Student;
    ctx.body = await new Promise(resolve => {
      Student.find({}, (err, res) => {
        if (res) {
          resolve({
            error_code: 200,
            data: res,
          });
        } else {
          resolve({
            error_code: 400,
            data: err,
          });
        }
      });
    });

  }


  /**
   * 更新id对应学生的的age
   */
  async update() {
    const ctx = this.ctx;
    const age = ctx.query.age;
    const id = ctx.query.id;
    const Student = this.ctx.model.Student;
    this.ctx.body = await new Promise(resolve => {
      Student.findOneAndUpdate({ id }, { age }, (err, res) => {
        if (res) {
          resolve({
            error_msg: 'ok',
            data: res,
          });
        }

      });
    });
  }

  /**
   * 删除所有记录
   */
  async removeAll() {
    const Student = this.ctx.model.Student;
    this.ctx.body = await new Promise(resolve => {
      Student.deleteMany({}, (err, res) => {
        if (res) {
          resolve({
            error_code: 3,
            error_msg: 'cleared',
          });
        }
      });
    });
  }

  /**
   * 通过id删除单个记录
   */
  async remove() {
    const ctx = this.ctx;
    const Student = ctx.model.Student;
    const id = ctx.query.id;
    ctx.body = await new Promise(resolve => {
      Student.findOne({
        id,
      }, (err, res) => {
        res.remove((err, res) => {
          if (res) {
            resolve({
              error_code: 3,
              error_msg: res,
            });
          }
        });
      });
    });
  }


}

module.exports = StudentController;

