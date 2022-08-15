const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { sequelize } = require('./models/index');

const router = require('./routers/router');

const app = new Koa();

const myMiddleWare = (async (ctx, next)=> {
    try {
        const resp = await next() ;
        ctx.body = {
            data: resp
        }
    } catch(e){
        ctx.body = {
                error: e.message,
                statusCode: e.getStatus
            }
        }
});
const options = {
    origin: '*'
};

app
    .use(bodyParser())
    .use(cors(options))
    .use(myMiddleWare)
    .use(router.routes())
    .use(router.allowedMethods());


sequelize.authenticate().then(async () => {
    console.log("connected to DB!");
    await sequelize.sync({force: true});

    app.listen(3000, ()=> {
        console.log("App is running")
    });

}).catch((err) => {
    console.log(err);
});
