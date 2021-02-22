const model = require('../models/userModel');

module.exports = {
    async login(ctx) {
        //1.接收表单数据
        let { username, password } = ctx.request.body;
        //2.安全验证
        if (username.length == 0) {
            await ctx.render('error', {
                message: "请输入用户名"
            });
        } else {
            //3.连接数据库
            let results = await model.getUserByNameAndPwd(username, password);
            //4.根据查询的结果跳转（或输出）不同的结果页面
            if (results.length > 0) {
                //向session作用域中存放loginUser变量
                ctx.session.loginUser = username;
                //redirect重定向，他会将页面的地址重新定向到指定的路由
                ctx.redirect('/');
            } else {
                await ctx.render('error', {
                    message: "登陆失败，用户名或密码不正确！！"
                })

            }
        }

    },
    async regist(ctx) {
        //1.接收表单数据
        let { username, password, nickname } = ctx.request.body;
        //2.安全验证
        if (username.trim().length == 0) {
            await ctx.render('error', {
                message: "用户名不能为空！！"
            })
        } else {
            //3.连接数据库
            let result = await model.saveUser({ username, password, nickname });
            if (result.insertId) {
                ctx.redirect('login', {
                    user: loginUser
                });
            } else {
                await ctx.render('error', {
                    message: "注册失败！"
                })
            }
        }
    },
    async checkUser(ctx){
        let {username} = ctx.query;
        let results = await model.getUserByUsername(username);
        if(results.length > 0){
            ctx.body = "fail"
        }else{
            ctx.body = "success"
        }
    }
};