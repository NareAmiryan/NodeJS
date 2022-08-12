const Service = require('../services/index')

class Controller{
    static async create({ name, firstName, lastName}){
        return await Service.create({ name, firstName, lastName})
    }

    static async update({ name, firstName, lastName}){
        return await Service.update({ name, firstName, lastName})
    }

    static async get({name,firstName,lastName}){
        return await Service.get({ name, firstName, lastName})
    }
}
module.exports = Controller
