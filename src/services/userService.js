import db from '../models/index'
import bcrypt from 'bcrypt'

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = {};
            let isExisted = await checkPostEmail(email);
            if (isExisted) {
                //Email existed;
                let user = await db.UserInfo.findOne({
                    where: { email: email },
                    // attributes: {
                    //     exclude: ['password']
                    // },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                })

                //user existed
                if (user) {
                    // Compare password
                    let check = await bcrypt.compare(password, user.password);

                    //right password
                    if (check) {
                        userInfo.errCode = 0;
                        userInfo.user = { ...user, password: null };
                    }
                    //wrong password
                    else {
                        userInfo.errCode = 3;
                        userInfo.errMessage = `wrong password!`;
                    }
                }
                else {
                    userInfo.errCode = 2;
                    userInfo.errMessage = `Email not found!`;
                }
            }
            else {
                userInfo.errCode = 1;
                userInfo.errMessage = `Email isnt existed!`;
            }

            resolve(userInfo);
        } catch (error) {
            reject(error);
        }
    })
}

const checkPostEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.UserInfo.findOne({
                where: { email: email }
            });

            if (userInfo) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error)
        }
    })
}

const comparePostPassword = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfo = await db.UserInfo.findOne({
                where: { email: email }
            });

            if (userInfo) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}