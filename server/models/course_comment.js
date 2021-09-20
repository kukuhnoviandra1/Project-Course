'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_Comment.belongsTo(models.User)
      Course_Comment.belongsTo(models.Course)
    }
  };
  Course_Comment.init({
    comment: DataTypes.STRING,
    created_on: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course_Comment',
  });
  return Course_Comment;
};