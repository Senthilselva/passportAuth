'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    salt: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    paranoid: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Employee;
};