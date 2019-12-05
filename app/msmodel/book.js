'use strict';
module.exports = app => {
  let { STRING, DATE, TINYINT, INTEGER, FLOAT } = app.Sequelize;

  return app.msmodel.define('book', {
    book_id: {
      type: STRING,
      primaryKey: true,
      comment: 'id',
    },
    book_name: STRING,
    book_author: STRING,
    book_category: STRING,
    book_price: FLOAT,
  }, {
    engine: 'InnoDB',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    underscored: true,
    operatorsAliases: false,
    comment: '储值卡表',
  });
};
