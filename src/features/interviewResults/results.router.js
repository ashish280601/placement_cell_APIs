import express from "express";
import ResultsController from "./results.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";

const resultRouter = express.Router();

const resultsController = new ResultsController();

resultRouter.get('/students/marks', jwtAuth, (req, res) => {
    resultsController.getInterviewResults(req, res);
})

resultRouter.post('/mark/:id', jwtAuth, (req, res) => {
    resultsController.interviewResults(req, res);
})

resultRouter.post('/excel/download', jwtAuth, (req, res) => {
    resultsController.exportResult(req, res);
})

export default resultRouter;