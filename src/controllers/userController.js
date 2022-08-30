import db from '../models/index'
import { json } from 'body-parser'

import userService from '../services/userService'

const handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs params',
        });
    }

    let userInfo = await userService.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userInfo.errCode,
        message: userInfo.errMessage,
        user: userInfo.user ?? {},
    });
}

const handleGetAllUsers = async (req, res) => {
    let id = req.query.id;//ALL, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: null
        });
    }

    let users = await userService.handleGetAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users: users
    });
}

const createUser = async (req, res) => {
    let message = await userService.createUser(req.body);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    createUser: createUser,
}