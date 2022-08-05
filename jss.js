const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const Joi = require('joi')

const database = [];

class BaseError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.status = statusCode;
    }
    getStatus(){
        return this.status
    }
}

const app = new Koa();
const router = new Router();
const myMiddleWare = (async (ctx, next)=> {
    try {
        const resp = await next() ;
        ctx.body = {
            data: resp
        }
    } catch(e){
        ctx.body = {
                error: e.message,
                statusCode: e.getStatus()
            }
        }
})

app.use(bodyParser())


// router.get('/bye', (ctx, next) => {
//     ctx.body = 'Bye';
// });
router.get('/users/:name', (ctx, next) => {
    // try{
    const {name} = ctx.params;
    const searchObject = database.find((item) => item.name === name);
    const {name: userName, firstName, lastName} = searchObject;
    /* ctx.body = {
        name: userName,
        firstName: firstName,
        lastName: lastName
        }
    } catch(err){
        ctx.response.status = 404;
        ctx.body = {
            error: 'Error Not Found'
        };
    } */
        return {
            name: userName,
            firstName: firstName,
            lastName: lastName
        }
});

router.post('/users', (ctx, next) => {
    const {body} = ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
    const validation = schema.validate(body);
    if (!validation.error) {
        database.push({
            name: body.name,
            firstName: body.firstName,
            lastName: body.lastName
        });
        // ctx.body = {
        //     key: "success"
        // };
        return {
            name: body.name,
            firstName: body.firstName,
            lastName: body.lastName
        }
    } else {
        // ctx.response.status = 404;
        // ctx.body = {
        //     error: 'Validation error'
        // };
        throw new BaseError("Validation Error", 400)
    }
});

router.put('/users', (ctx, next) => {
    const {body} = ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    })
    const validation = schema.validate(body);
    if (!validation.error) {
        const filteredArray = database.filter(item => item.name === body.name);
        if (filteredArray.length === 0) {
            database.push({
                name: body.name,
                firstName: body.firstName,
                lastName: body.lastName
            });
            // ctx.body = {
            //     success: true
            // };
            return {
                name: body.name,
                firstName: body.firstName,
                lastName: body.lastName
            };
        } else {
            const searchObject = database.find((item) => item.name === body.name);
            for (const item of database) {
                if (item.name === body.name) {
                    item.firstName = body.firstName;
                    item.lastName = body.lastName;
                    break;
                }
            }
            const {name: userName, firstName, lastName} = searchObject;
            // ctx.body = {
            //     success: true
            // }
            return{
                name: userName,
                firstName:firstName,
                lastName:lastName
            };
        }
    } else {
        // ctx.response.status = 404;
        // ctx.body = {
        //     error: 'Validation error'
        // };
        // return;
        throw new BaseError("Validation Error", 400)
    }
});



router.patch('/users', (ctx, next) => {
    const {body} = ctx.request;
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string()
    })
    const validation = schema.validate(body);
    // validate request joi - lib
    if (!validation.error) {
        for (let i=0; i < database.length; i++) {
            const item = database[i];
            if (item.name === body.name) {
                database[i] = {
                    ...item,
                    ...body
                }
            }
        };
        return {
            name: body.name,
            firstName:body.firstName,
            lastName:body.lastName
          };
    }else {
      //     ctx.response.status = 404;
      // /*    return {
      //         success: 'Validation error'
      //     }
      //     throw new Error("")*/
      //     ctx.body = {
      //          error: 'Validation error'
      //      };
        throw new BaseError("Validation Error", 400)
    }
});

app
    .use(myMiddleWare)
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
