import express from "express";
import StudentsController from "./students.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const studentRouter = express.Router();

const studentController = new StudentsController();


studentRouter.get('/', jwtAuth, (req, res) => {
    studentController.getAllStudents(req, res);
})

studentRouter.post('/add', jwtAuth, (req, res) => {
    studentController.addStudents(req, res);
})


export default studentRouter;
