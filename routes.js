import express from "express";
import studentRouter from "./src/features/students/students.router.js";
import userRouter from "./src/features/users/user.router.js";
import interviewRouter from "./src/features/Interviews/interviews.router.js";
import resultRouter from "./src/features/interviewResults/results.router.js";

const routes = express.Router();

// creating an root middleware router
routes.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to Placement Cell API's",
        status: true
    })
})

routes.use('/api/auth/', userRouter);
routes.use('/api/student', studentRouter);
routes.use('/api/interview', interviewRouter);
routes.use('/api/results', resultRouter);

// middlware if router not found
routes.use((req, res) => {
    return res.status(404).json({
        message: "API's not found",
        status: false
    });
})

export default routes