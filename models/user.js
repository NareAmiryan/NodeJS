const { Sequelize,Model , DataTypes } = require('sequelize')
//const sequelize = new Sequelize()
module.exports = function (sequelize, DataTypes) {
    const users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
    })
    return users
};


