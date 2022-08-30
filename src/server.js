import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/connectDB'

require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));

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