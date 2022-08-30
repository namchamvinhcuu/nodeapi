import express from "express"

//Controllers
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router();
let initWebRoutes = (app) => {

    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUDPage);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.getCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);

    ////api for react
    //USER
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-users', userController.handleGetAllUsers);
    router.post('/api/create-user', userController.createUser);


    return app.use("/", router);
}

module.exports = initWebRoutes;