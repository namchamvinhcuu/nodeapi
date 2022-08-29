import bcrypt from 'bcrypt'
import db from '../models/index'

const saltRounds = 10;

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.UserInfo.findAll({
                raw: true
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

const createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let passHash = await hashUserPassword(data.password);
            await db.UserInfo.create({
                ...data, password: passHash
            });

            resolve("Successfully !");
        } catch (error) {
            reject(error);
        }
    });
}

const hashUserPassword = async (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                resolve(hash);
            });
        } catch (e) {
            reject(e);
        }
    })
}

const getUserInfoById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.UserInfo.findByPk(id);
            resolve(userInfo);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
}