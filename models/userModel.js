const db = require('./db');
module.exports = {
    getUserByNameAndPwd(username, password){
        return db.query("select * from t_user where username=? and password=?", [username, password]);
    },
    saveUser(user){
        return db.query("insert into t_user set ?", user);
    },
    getUserByUsername(username){
        return db.query("select * from t_user where username=?", [username]);
    },
    getUserIdByUsername(username){
        return db.query("SELECT t_user.user_id from t_user where t_user.username=?", [username]);
    }
};