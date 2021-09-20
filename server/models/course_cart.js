'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_Cart.belongsTo(models.User);
      Course_Cart.hasMany(models.Line_Item);
    }
  };
  Course_Cart.init({
    created_on: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(cart,option){
        cart.status='Open'
      }
    },
    sequelize,
    modelName: 'Course_Cart',
  });
  return Course_Cart;
};