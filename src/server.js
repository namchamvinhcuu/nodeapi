import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/connectDB'

require("dotenv").config();

const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_ORIGIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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