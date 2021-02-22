const model =require('../models/blogModel');
const model2 = require('../models/userModel');
module.exports = {
    async homePage(ctx) {
        //查询所有文章数据
        let results = await model.getBlogs();
        let loginUser = ctx.session.loginUser;
        await ctx.render('index', {
            blogs: results,
            user:loginUser
        });
    },
    async postBlog(ctx){
        //1.接收表单数据
        let { title, content } = ctx.request.body;
        let loginUser = ctx.session.loginUser;
        let result = await model2.getUserIdByUsername(loginUser);
        let user_id =result[0].user_id;
        let data = {title,content,user_id};

        //2.安全验证
        if (title.trim().length == 0) {
             await ctx.render('error', {
                message: "标题不能为空！！"
             })
         } else {
             //3.连接数据库
             let result = await model.saveBlogs(data);
             
             if (result.insertId) {
                 ctx.redirect('/', {
                     user: loginUser
                 });
             } else {
                 await ctx.render('error', {
                     message: "发布失败！"
                 })
             }
         }
    }
    
};