const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./Routers');

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
                statusCode: e.getStatus()
            }
        }
})

app
    .use(bodyParser())
    .use(myMiddleWare)
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);
