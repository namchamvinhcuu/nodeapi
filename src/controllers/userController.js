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

module.exports = {
    handleLogin: handleLogin
}