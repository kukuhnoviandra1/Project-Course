'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User);
      Course.hasMany(models.Course_Comment)
      Course.hasMany(models.Course_Content)
      Course.hasMany(models.Line_Item)
    }
  };
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    sub_category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    total_materi: DataTypes.INTEGER,
    level: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    student: DataTypes.INTEGER,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};