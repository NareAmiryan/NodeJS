const {users} = require('../models/index')
const {BaseError} = require('../Error')
class Service{
    static async create({ name, firstName, lastName}){
        try {
                await users.create({name, firstName, lastName});
        } catch (e) {
            throw new BaseError(e.message, 400);
        }
        return {success: true};
    }

    static async update({ name, firstName, lastName}){
        try {
            await users.update({name, firstName, lastName}, {
                where: {
                    name
                }
            });
        } catch (e) {
            throw new BaseError(e.message, 400);
        }
        return {success: true};
    }

    static async get({ name }){
        try {
            let inc = await users.findOne({where: {name}})
            if (!inc) {
                throw new BaseError("Error", 404)
            }
            return inc;
        }
        catch(e){
            throw new BaseError(e.message, 400);
        }
    }
}

module.exports = Service
