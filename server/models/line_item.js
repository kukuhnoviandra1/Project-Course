'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Line_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Line_Item.belongsTo(models.Course);
      Line_Item.belongsTo(models.Course_Cart);
      Line_Item.belongsTo(models.Order)
    }
  };
  Line_Item.init({
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    CourseId: DataTypes.INTEGER,
    CourseCartId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  },{
    hooks: {
      beforeCreate(lineitem,option){
        lineitem.status='Cart'
      }
    },
    sequelize,
    modelName: 'Line_Item',
  });
  return Line_Item;
};