const {connect, sql } = require('../../config/database');
const md5 = require('md5');


//
async function findUser(userInfo, result) {
    try {
    var sqlString = 'select * from users where userName = @userName or email = @email';
    const pool = await connect;
    return await pool.request()
    .input('userName', sql.VarChar, userInfo.userName)
    .input('email', sql.VarChar, userInfo.email)
    .query(sqlString, (err, data) => {  
        if(!err) {
            result(null, data.recordset[0])
        } else {
            result(err)
        }
    })
    } catch (err) {
        result(err)
    }  
}
async function newUser(data, result) {
    try {
        const hashedPassword = md5(data.password)
        const sqlString = 'INSERT INTO Users(userName, email, password) values (@userName, @email, @password)'
        const pool = await connect;
        return await pool.request()
        .input('userName',sql.VarChar, data.userName)
        .input('email',sql.VarChar, data.email)
        .input('password',sql.VarChar, hashedPassword)
        .query(sqlString, (err, data) => {
            if (!err) { 
                result(null, data)
            } else {
                result(err)
            }
        })
    } catch (error) {
        result(error)
    }
}

async function updateUser(id ,user, result) {
    try {
        const hashedPassword = md5(user.password)
        const sqlString  = `update Users
            set 
            nickName = N'${user.nickName}',
            password = '${hashedPassword}', 
            firstName = N'${user.firstName}',
            lastName = N'${user.lastName}',
            fullName = N'${user.fullName}'
            where userId = ${id}`
        const pool = await connect;
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (!err) { 
                result(null, data)
            } else {
                result(err)
            }
        })
    } catch(err) {
        result(err)
    }
}

async function searchByUserName(id, data, result) {
    try {
        const sqlString  = `select * from users where userName like N'%${data}%'`
        const pool = await connect;
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (!err) { 
                result(null, data.recordset)
            } else {
                result(err)
            }
        })
    } catch(err) {
        result(err)
    }
}

async function searchByNickName(id, data, result) {
    try {
        const sqlString  = `select * from users where nickName like N'%${data}%'`
        const pool = await connect;
        return await pool.request()
        .query(sqlString, (err, data) => {
            if (!err) { 
                result(null, data.recordset)
            } else {
                result(err)
            }
        })
    } catch(err) {
        result(err)
    }
}

module.exports = {
    findUser, newUser, updateUser, searchByUserName, searchByNickName
}