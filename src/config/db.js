/* 
Steps to connect my mongoose database
1. import the mongoose
2. use the connect method to connect with the cluster database
*/

import mongoose  from "mongoose";

// console.log(process.env.URL);

const db = async () => {
    try {
        mongoose.connect(process.env.URL);
        console.log("Mongoose is connected with database");
    } catch (error) {
        console.log("Error while connecting with database", error);
        process.exit();
    }
}

export default db;