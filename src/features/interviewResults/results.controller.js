import ResultsRepository from "./results.repository.js";
import xlsx from "xlsx";

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
      const student = req.query.studentId;
      const interview = req.params.id;
      const { result } = req.body;

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

  async exportResult(req, res){
    try {
      if(!req.body){
        return res.status(500).json({
          data:{
            message: "No Data found",
            success : false
          }
        })
      }
      const results = await this.resultsRepository.getAllResults();

      const worksheetData = results.map((result) => {
        return result.students.map((student) => ({
          interviewId: result._id,
          studentId: student.studentId,
          company: result.company,
          location: result.location,
          designation: result.designation,
          mode: result.mode,
          date: result.date.toISOString().split('T')[0],
          name: student.name,
          college: student.college,
          batch: student.batch,
          status: student.status,
          'score.DSA_Score': student.score.DSA_Score,
          'score.Web_Score': student.score.Web_Score,
          'score.React_Score': student.score.React_Score,
          result: student.result,
        }));
      }).flat();

      const worksheet = xlsx.utils.json_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Results');

    const filePath = './uploads/interview_results.xlsx';
    xlsx.writeFile(workbook, filePath);

    res.download(filePath, 'interview_results.xlsx', (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send({ message: 'Error downloading file' });
      }
    });
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
      res.status(500).send({ data: { message: 'Error exporting data to Excel'}, error });
    }
  }
}
