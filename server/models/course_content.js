'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_Content.belongsTo(models.Course);
    }
  };
  Course_Content.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.STRING,
    filename: DataTypes.STRING,
    filesize: DataTypes.STRING,
    filetype: DataTypes.STRING,
    resource_link: DataTypes.STRING,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course_Content',
  });
  return Course_Content;
};