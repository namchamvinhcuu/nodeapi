import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/connectDB'

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config app
viewEngine(app);
initWebRoutes(app);

// connectDB.connectMySQLDB();
connectDB.connectMSSQLDB();

const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("server is running on port: " + port);
});