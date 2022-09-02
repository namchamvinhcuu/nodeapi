import bcrypt from 'bcrypt'
import db from '../models/index'

const saltRounds = 10;

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.UserInfo.findAll({
                raw: true
            });
            return resolve(users);
        } catch (error) {
            return reject(error);
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

            return resolve("Successfully !");
        } catch (error) {
            return reject(error);
        }
    });
}

const hashUserPassword = async (password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                return resolve(hash);
            });
        } catch (error) {
            return reject(error);
        }
    })
}

const getUserInfoById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.UserInfo.findByPk(id);
            return resolve(userInfo);
        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
}