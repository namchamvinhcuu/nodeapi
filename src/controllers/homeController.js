
import db from '../models/index'
import connectDB from '../config/connectDB'
import CRUDService from '../services/CRUDService'
import { json } from 'body-parser'

const getHomePage = async (req, res) => {
    try {

        let data = await db.UserInfo.findAll();
        // await connectDB.pool.connect();
        // const data = await connectDB.pool.request().query(`SELECT * FROM UserInfo`);
        // const data = await connectDB.pool.request().execute(`usp_Menu_GetAllExceptRoot`);
        return res.render("homepage.ejs", {
            // data: JSON.stringify(data.recordset),
            // data: data.recordset,
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error)
    }
    finally {
        // connectDB.pool.close();
    }
}

const getAboutPage = (req, res) => {
    return res.render("about/about.ejs")
}

const getCRUDPage = (req, res) => {
    return res.render("crud.ejs")
}

const getCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs", {
        data: data
    })
}


const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.send(message)
}

const getEditCRUD = async (req, res) => {
    if (req.query.id) {
        let userInfo = await CRUDService.getUserInfoById(req.query.id);

        return res.send("getEditCRUD: " + JSON.stringify(userInfo));
    }

    return res.send("getEditCRUD: ");
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUDPage: getCRUDPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getEditCRUD: getEditCRUD,
};