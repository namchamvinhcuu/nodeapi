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
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
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

            return resolve(userInfo);
        } catch (error) {
            return reject(error);
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
                return resolve(true);
            }
            return resolve(false);
        } catch (error) {
            return reject(error)
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

            return resolve(users);
        } catch (error) {
            console.log(error)
            return reject(error);
        }
    });
}

const createUser = (postUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmailExisted = await checkPostEmail(postUserData.email);

            if (checkEmailExisted) {
                return resolve({
                    errCode: 1,
                    message: "Email is existed!"
                });
            }

            let hashPass = await hashUserPassword(postUserData.password);
            await db.UserInfo.create({
                ...postUserData, password: hashPass
            });
            return resolve({
                errCode: 0,
                message: "OK"
            });
        } catch (error) {
            return reject(error);
        }
    })
}

const editUser = (postUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.UserInfo.findByPk(postUserData.id, { raw: false });
            if (!user) {
                return resolve({
                    errCode: 2,
                    errMessage: 'User is not existed!'
                })
            }
            await user.update(postUserData);

            return resolve({
                errCode: 0,
                errMessage: 'User is updated!'
            });
        } catch (error) {
            return reject(error);
        }
    });
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.UserInfo.findByPk(userId);
            if (!user) {
                return resolve({
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
            return resolve({
                errCode: 0,
                errMessage: 'Deleted!'
            });
        } catch (error) {
            return reject(error);
        }
    });
}

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPass = await bcrypt.hash(password, saltRounds);
            return resolve(hashPass);
        } catch (error) {
            return reject(error);
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