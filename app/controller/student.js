const Controller = require('egg').Controller;

/**
 * 演示mongo的增删改查
 *
 * mongoose里面操作不返回promise对象而是一个Query，为了方便使用await，需要在async函数里用Promise手动包起来
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
        id: id,
        name: name,
        age: 22,
        subjects: [ 2, 4, 1, 6, 3 ]
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
        msg: e
      };
    }
  }


  /**
   * 通过id查找记录
   * @returns {Promise<void>}
   */
  async find() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const Student = this.ctx.model.Student;
    ctx.body = await new Promise(resolve => {
      Student.findOne({
        id: id
      }, (err, res) => {
        if (res) {
          resolve({
            error_code: 200,
            data: res,
          });
        } else {
          resolve({
            error_code: 400,
            data: err
          });
        }
      });
    });

  }

  /**
   * 返回年龄符合的list
   * @returns {Promise<void>}
   */
  async list() {
    const ctx = this.ctx;
    const age = ctx.query.age;
    const Student = this.ctx.model.Student;
    ctx.body = await new Promise(resolve => {
      Student.find({
        age: age,
      }, (err, res) => {
        if (res) {
          resolve({
            error_code: 200,
            data: res,
          });
        } else {
          resolve({
            error_code: 400,
            data: err
          });
        }
      });
    });

  }


  /**
   * 更新 晓明的age
   * @returns {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const age = ctx.query.age;
    const Student = this.ctx.model.Student;
    this.ctx.body = await new Promise(resolve => {
      Student.findOneAndUpdate({ name: '晓明' }, { age: age }, (err, res) => {
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
   * 删除所有年龄为22岁的记录
   * @returns {Promise<void>}
   */
  async removeAll() {
    const Student = this.ctx.model.Student;
    this.ctx.body = await new Promise(resolve => {
      Student.deleteMany({
        age: '22'
      }, (err, res) => {
        if (res) {
          resolve({
            error_code: 3,
            error_msg: 'cleared'
          });
        }
      });
    });
  }

  /**
   * 通过id删除单个记录
   * @returns {Promise<void>}
   */
  async remove() {
    const ctx = this.ctx;
    const Student = ctx.model.Student;
    const id = ctx.query.id;
    ctx.body = await new Promise(resolve => {
      Student.findOne({
        id: id
      }, (err, res) => {
        res.remove((err, res) => {
          if (res) {
            resolve({
              error_code: 3,
              error_msg: res
            });
          }
        });
      });
    });
  }


}

module.exports = StudentController;

