const db = require('./db');
module.exports = {
    getBlogs(){
        return db.query("select * from t_blog");
    },
    saveBlogs(data){
        return db.query("insert into t_blog set ?", data);
    },
};