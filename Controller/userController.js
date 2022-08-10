const Service = require('../services/index')

class Controller{
    static async add({ name, firstName, lastName}){
        return await Service.add({ name, firstName, lastName})
    }

    static async get({name,firstName,lastName}){
        return await Service.get({ name, firstName, lastName})
    }
}
module.exports = Controller
