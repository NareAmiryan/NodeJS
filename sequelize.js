/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
const Users =  sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

class User extends Model {}
User.init({
    name:DataTypes.STRING,
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING
},{sequelize,modelName: 'user'});

(async ()=>{
    await sequelize.sync();
    const jane=await User.create({
        name:'Jane Adi',
        firstName:'Jane',
        lastName:'Adi'
    });
    console.log(jane.toJSON());
})();

module.exports=User
module.exports=sequelize
*/
