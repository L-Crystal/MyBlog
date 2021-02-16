//引入koa-router路由
const Router = require('@koa/router');
const router = new Router();

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

function getBlogData(){
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // not connected!
            } else {
                connection.query(
                    `select * from t_blog`,
                    function (error, results) {
                        connection.release();//释放连接，放回pool中
                        if (error) {
                            reject(err);
                        } else {
                            resolve(results);
                        }

                    });
            }

        });
    })
}

//首页
router.get('/', async (ctx) => {
    //查询所有文章数据
    let results = await getBlogData();
    await ctx.render('index',{
        blogs:results
    });
});

//登录
router.get('/login', async (ctx) => {
    await ctx.render('login');
});

function getUserData(username, password) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // not connected!
            } else {
                connection.query(
                    `select * from t_user where username='${username}' and password='${password}'`,
                    function (error, results) {
                        connection.release();//释放连接，放回pool中
                        if (error) {
                            reject(err);
                        } else {
                            resolve(results);
                        }

                    });
            }

        });
    })
}

function saveUser(user){
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // not connected!
            } else {
                connection.query(
                    `insert into t_user set ?`,user,
                    function (error, results) {
                        connection.release();//释放连接，放回pool中
                        if (error) {
                            reject(err);
                        } else {
                            resolve(results);
                        }

                    });
            }

        });
    })
}

router.post('/login', async (ctx) => {
    //1.接收表单数据
    let { username, password } = ctx.request.body;
    //2.安全验证
    //3.连接数据库
    let results = await getUserData(username, password);
    //4.根据查询的结果跳转（或输出）不同的结果页面
    if (results.length > 0) {
        await ctx.render('index');
    } else {
        await ctx.render('error', {
            message: "登陆失败，用户名或密码不正确！！"
        })

    }


});

//注册
router.get('/regist', async (ctx) => {
    await ctx.render('regist')
});
router.post('/regist', async (ctx) => {
    //1.接收表单数据
    let { username, password, nickname } = ctx.request.body;
    //2.安全验证
    if (username.trim().length == 0) {
        await ctx.render('error', {
            message: "用户名不能为空！！"
        })
    } else {
        //3.连接数据库
        let result = await saveUser({username, password, nickname});
        if(result.insertId){
            await ctx.render('login');
        }else{
            await ctx.render('error', {
                message: "注册失败！"
            })
        }
    }

})

module.exports = router;