import ResultsModel from "../interviewResults/results.schema.js";
import StudentModel from "../students/students.schema.js";
import InterviewsModel from "./interviews.schema.js";

export default class InterviewsRepository {
  async getCompany() {
    try {
      const getCompany = await InterviewsModel.find().populate("students");
      return getCompany;
    } catch (error) {
      throw new Error(
        "Something went wrong while fetching company data from database",
        500
      );
    }
  }

  async addInterview(company, location, designation, date, mode) {
    try {
      const addCompany = new InterviewsModel({
        company,
        location,
        designation,
        date,
        mode,
      });
      await addCompany.save();
      return addCompany;
    } catch (error) {
      throw new Error(
        "Something went wrong while creating interview in database",
        500
      );
    }
  }

  async allocateInterview(studentsId, interviewId) {
    try {
      const interview = await InterviewsModel.findById(interviewId);

      if (!interview) {
        throw new Error("Interview not found");
      }

      for (const studentId of studentsId) {
        const student = await StudentModel.findById(studentId);

        if (!student) {
          throw new Error(`Student with id ${studentId} not found`);
        }

        // Check if the student is already part of the interview
        if (!interview.students.includes(studentId)) {
          interview.students.push(studentId);
        }
      }

      await interview.save();
      return interview;
    } catch (error) {
      console.error("Error while assigning interview:", error);
      throw new Error(
        "Something went wrong while assigning interview: " + error.message
      );
    }
  }
}
