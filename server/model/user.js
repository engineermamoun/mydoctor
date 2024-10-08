const { Sequelize, DataTypes } = require('sequelize');

const db = require("./database");

const User = db.define("user", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type:DataTypes.STRING,
  },

  userType: {
    type: DataTypes.ENUM("doctor", "normal"),
  },
  latitude: {
    type: DataTypes.FLOAT,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
});

User.associate = models => {
    User.hasOne(models.Profile)
}

module.exports = User;
