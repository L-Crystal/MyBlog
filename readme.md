## 1.需求分析
    （1）登录/注册
    （2）文章列表：首页
    （3）文章详情
    （4）发表文章
    （5）文章评论
## 2，项目结构设计
    （1）node_modules:各种npm包
    （2）views：视图文件（html、ejs）
    （3）public:
        （3.1）images：存放图片
        （3.2）Java scripts：存放js文件
        （3.3）stylesheets：存放css文件
    （4）routes：路由文件
    （5）controllers：控制器文件
    （6）models：数据模型文件（数据库操作相关的文件）
    （7）config：配置文件
    （8）app.js：项目的启动（入口）
    （9）package.json：项目的配置文件
## 3.数据库设计
    （1）名词解释
        （1.1）ER图（Entity Relationship）：描述数据库表结构之间的关系
        （1.2）主键（Primary Key）：确保表中记录唯一性
        （1.3）外键（Foreign Key）：维护父表和子表之间的关系，外键需要进行配置，外键的命名规范：fk_父表名_子表名_外键名
    （2）数据库表间关系
        （2.1）一对多：最常见，比如一个用户可以发表多个文章，数据库中通过在子表中放置一个外键来维护一对多关系
        （2.2）一对一：用户与身份证信息，数据中使用{唯一外键}和{主键关联}两种方式维护一对一关系
        （2.3）多对多：（老师与学生）数据库中通过再创建一个第三张表（联合主键），来维护
    （3）数据库设计
        （3.1）t_user：用户表
        （3.2）t_blog：博客表
## 4.安装配置
    （1）npm init -y
    （2）npm i koa
    （3）npm i @koa/router
    （4）npm i koa-bodyparser :处理表单post方式提交数据
    （5）npm i koa-static ：静态资源文件
    （6）模板引擎
        （6.1）npm i koa-views
        （6.2）npm i ejs
    （7）npm i mysql :mysql数据库驱动
## 5.开发流程
    （1）设计views页面
        figma原型：https://www.figma.com/file/ud8JbA8HbJgIfhvFCekUoa/MyBlog?node-id=0%3A1&viewport=-32%2C-51%2C0.5
    （2）配置public静态资源文件
    （3）设计和配置路由
        （3.1）“/” ：进入index.ejs
        （3.2）“/login” ：进入login.ejs
        （3.3）“/redist” ：进入regist.ejs
        将路由的代码放置在routes下的index.js模块中，减少app.js中的代码量
    （4）正式开发
        （4.1）开发login功能
            （4.1.1）编写login.ejs页面
            （4.1.2）编写post方式的/login路由逻辑
        （4.2）models中的方法命名规范：get查、save增、delete删、update改
## 6.补充知识
    （1）redirect和render的区别：
    redirect是重定向，将页面的地址重新定向到新路由，不能向页面传递数据；
    render是跳转，不会重定向地址，可以传递数据给页面
    （2）MVC（Model,View,Controller）
        （2.1）View：视图文件（用户可见的页面）
        （2.2）Controller：控制器文件，用来处理业务逻辑的，控制业务流程跳转
        （2.3）Model：数据模型，（数据库操作相关的文件）
    （3）session：会话作用域

    