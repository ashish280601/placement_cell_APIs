import ResultsRepository from "./results.repository.js";

export default class ResultsController {
  constructor() {
    this.resultsRepository = new ResultsRepository();
  }

  async getInterviewResults(req, res) {
    try {
      const getResults = await this.resultsRepository.getInterviewResult();
  
      if (!getResults || getResults.length === 0) {
        return res.status(400).json({
          data: {
            message: "Not found",
            status: false,
          },
        });
      }
  
      return res.status(200).json({
        data: getResults,
        message: "Interview results fetched successfully",
        status: true,
      });
    } catch (error) {
      console.error("Error fetching interview results:", error);
      return res.status(500).json({
        data: {
          message: "Something went wrong while fetching interview results",
          status: false,
        },
      });
    }
  }

  async interviewResults(req, res) {
    try {
      const interview = req.params.id;
      const { result, student } = req.body;

      if (!student) {
        return res.status(400).json({
          data: { 
            message: "Please select student",
            status: false,
          },
        });
      } else if (!interview) {
        return res.status(400).json({
          data: {
            message: "Please select company to schedule interview",
            status: false,
          },
        });
      }

      const validResults = ["Pass", "Fail", "Didn't Attempt", "On Hold"];
      if (!validResults.includes(result)) {
        return res.status(400).json({
          data: {
            message: "Invalid result value",
            status: false,
          },
        });
      }

      const studentResult = await this.resultsRepository.addStudentResults(
        student,
        interview,
        result
      );

      return res.status(200).json({
        data: {
          data: studentResult,
          message: "Results added successfull",
          status: true,
        },
      });
    } catch (error) {
      if (error.message === "Student not scheduled for this interview") {
        return res.status(400).json({
          data: {
            message: error.message,
            status: false,
          },
        });
      }

      return res.status(500).json({
        data: {
          message: "An error occurred",
          status: false,
        },
      });
    }
  }

}
