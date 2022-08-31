import db from '../models/index'
import bcrypt from 'bcrypt'
import _ from 'lodash'

const saltRounds = 10;

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
                    // raw: true,
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

const getUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = [];
            if (userId && userId.toUpperCase() !== 'ALL') {
                if (_.toInteger(userId) === 0) {
                    users = [];
                }
                else {
                    let user = await db.UserInfo.findByPk(userId, {
                        attributes: {
                            exclude: ['password']
                        }
                    });

                    users = [...users, user];
                }
            } else {
                users = await db.UserInfo.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }

            resolve(users);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

const createUser = (postUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmailExisted = await db.checkPostEmail(postUserData.email);

            if (checkEmailExisted) {
                resolve({
                    errCode: 1,
                    message: "Email is existed!"
                });
            }

            let hashPass = await hashUserPassword(postUserData.password);
            await db.UserInfo.create({
                ...postUserData, password: hashPass
            });
            resolve({
                errCode: 0,
                message: "OK"
            });
        } catch (error) {
            reject(error);
        }
    })
}

const editUser = (postUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.UserInfo.findByPk(postUserData.id, { raw: false });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not existed!'
                })
            }
            await user.update(postUserData);

            resolve({
                errCode: 0,
                errMessage: 'User is updated!'
            });
        } catch (error) {
            reject(error);
        }
    });
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.UserInfo.findByPk(userId);
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not existed!'
                })
            }

            //delete record using sequelize
            await db.UserInfo.destroy({
                where: {
                    id: userId
                }
            });
            resolve({
                errCode: 0,
                errMessage: 'Deleted!'
            });
        } catch (error) {
            reject(error);
        }
    });
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await bcrypt.hash(password, saltRounds);
            resolve(hashPass);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser,
}