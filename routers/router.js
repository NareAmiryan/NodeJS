const Router = require('@koa/router');
const Joi = require("joi");
const {BaseError} = require("../Error");
const Controller=require('../Controller/userController')
const router = new Router();


router.get('/users/:name', (ctx, next) => {
    const {name} = ctx.params;
    return Controller.get({name})
});

router.post('/users', async (ctx, next) => {
    const { body:{ name, firstName, lastName } } = ctx.request;
    const {body}=ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
    const validation = schema.validate(body);
    if (!validation.error) {
        return Controller.add({name, firstName, lastName});
    } else {
        throw new BaseError("Validation Error", 400);
    }
})


router.put('/users', async (ctx, next)=> {
    const { body:{ name, firstName, lastName } } = ctx.request;
    const {body} = ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
    const validation = schema.validate(body);
    if (!validation.error) {
            return Controller.add({name, firstName, lastName});
    } else {
        throw new BaseError("Validation Error", 400)
    }
});


router.patch('/users', async (ctx, next) => {
    const {body} = ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string()
    })
    const validation = schema.validate(body);
    if (!validation.error) {
            return Controller.add({name, firstName, lastName});
    } else {
            throw new BaseError("Validation Error", 400)
    }
});

module.exports=router;