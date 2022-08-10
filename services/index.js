const {users} = require('../models/index')
const {BaseError} = require('../Error')
class Service{
    static async add({ name, firstName, lastName}){
        try {
            let incl = await users.findOne({where: {name}})
            if (!incl) {
                await users.create({name, firstName, lastName});
            } else {
                await users.update({name, firstName, lastName}, {
                    where: {
                        name
                    }
                });
            }
        }
        catch (e) {
            throw new BaseError("Validation Error",400);
        }
        return "Congratulations";
    }

    static async get({ name }){
        let inc=await users.findOne({where: {name}})
        if(!inc){
            throw new BaseError("Error",404)
        }
        return inc;
    }
}

module.exports = Service
