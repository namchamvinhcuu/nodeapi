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

const getUsers = async (req, res) => {
    let id = req.query.id;//ALL, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: null
        });
    }

    let users = await userService.getUsers(req.query);
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

const editUser = async (req, res) => {
    let message = await userService.editUser(req.body);
    return res.status(200).json(message);
}

const deleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required params!'
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleLogin: handleLogin,
    getUsers: getUsers,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser,
}