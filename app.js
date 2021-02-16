const Koa = require('koa');
//引入koa-router路由
const Router = require('@koa/router');
//引入ejs模块引擎
const views = require('koa-views')
const path = require('path')

const app = new Koa();
const router = new Router();

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
  }))

//首页
router.get('/', async (ctx, next) => {
    await ctx.render('index');
});

//登录
router.get('/login', async(ctx)=>{
    await ctx.render('login');
});

//注册
router.get('/regist', async(ctx)=>{
    await ctx.render('regist');
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')