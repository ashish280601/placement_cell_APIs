import express from "express";
import "./env.js";
import db from "./src/config/db.js";
import routes from "./routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const server = express();

const port = process.env.PORT || 9000;

server.use(cors());

server.use(bodyParser.json())
server.use(express.urlencoded( { extended: true }));

server.use(routes)

server.listen(port, () => {
    try {
        console.log(`Server is listening on http://localhost:${port}`);
        db();
    } catch (error) {
        console.log('Error while connecting with server', error);
    }
})