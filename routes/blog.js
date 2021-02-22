//引入koa-router路由
const Router = require('@koa/router');
const router = new Router();

let controller = require('../controllers/blog');

//首页
router.get('/', controller.homePage);

//发表文章页面
router.get('/post', async (ctx) => {
    let loginUser = ctx.session.loginUser;
    await ctx.render('postBlog',{
        user:loginUser
    })
});
router.post('/post',controller.postBlog);


module.exports = router;


