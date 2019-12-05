'use strict';

module.exports = app => {
  const Schema = app.mongoose.Schema;
  const conn = app.mongooseDB.get('db1');

  const studentSchema = new Schema(
    {
      id: {
        type: String,
        index: true,
      },
      name: { type: String },
      age: { type: Number },
      subjects: [],
    }
  );
  return conn.model('Student', studentSchema);
};
