import ResultsModel from "./results.schema.js";
import InterviewsModel from "../Interviews/interviews.schema.js";

export default class ResultsRepository {
  async getInterviewResult() {
    try {
      const allStudentResults = await ResultsModel.aggregate([
        {
          $lookup: {
            from: "interviews",
            localField: "interview",
            foreignField: "_id",
            as: "interviewDetails",
          },
        },
        {
          $unwind: "$interviewDetails",
        },
        {
          $lookup: {
            from: "students",
            localField: "student",
            foreignField: "_id",
            as: "studentDetails",
          },
        },
        {
          $unwind: "$studentDetails",
        },
        {
          $group: {
            _id: "$interviewDetails._id",
            company: { $first: "$interviewDetails.company" },
            location: { $first: "$interviewDetails.location" },
            designation: { $first: "$interviewDetails.designation" },
            mode: { $first: "$interviewDetails.mode" },
            date: { $first: "$interviewDetails.date" },
            students: {
              $push: {
                studentId: "$studentDetails._id",
                name: "$studentDetails.name",
                college: "$studentDetails.college",
                batch: "$studentDetails.batch",
                status: "$studentDetails.status",
                score: "$studentDetails.score",
                result: "$result",
              },
            },
          },
        },
      ]);

      return allStudentResults;
    } catch (error) {
      console.error("Error while fetching student result from database", error);
      throw new Error(
        "Something went wrong while fetching student result from database"
      );
    }
  }

  async addStudentResults(studentId, interviewId, result) {
    try {
      // Check if the student is scheduled for the interview
      const interview = await InterviewsModel.findOne({
        _id: interviewId,
        students: studentId,
      });
      if (!interview) {
        throw new Error("Student not scheduled for this interview");
      }
      // Ensure only the 'result' field is updated
      const studentResult = await ResultsModel.findOneAndUpdate(
        { student: studentId, interview: interviewId },
        { $set: { result } },
        { new: true, upsert: true, runValidators: true }
      );
      return studentResult;
    } catch (error) {
      console.error("Error while updating interview result:", error.message);
      throw new Error("Something went wrong with the database");
    }
  }

}
