import express from "express";
import InterivewsController from "./interviews.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const interviewRouter = express.Router();

const interivewsController = new InterivewsController()

interviewRouter.get('/', jwtAuth, (req, res) => {
    interivewsController.getCompany(req ,res);
})

interviewRouter.post('/add', jwtAuth, (req, res) => {
    interivewsController.addCompany(req ,res);
})

interviewRouter.post('/allocate-interview/:companyId', (req, res) => {
    interivewsController.allocateInterview(req, res);
})


export default interviewRouter
