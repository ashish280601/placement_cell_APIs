import StudentModel from "./students.schema.js";

export default class StudentsRepository {
  // get all students
  async getAllStudents() {
    try {
      const allStudent = await StudentModel.aggregate([
        {
          $lookup: {
            from: 'interviews',
            localField: '_id',
            foreignField: 'students',
            as: 'interviewDetails'
          }
        },
        {
          $project: {
            name: 1,
            college: 1,
            batch: 1,
            status: 1,
            score: 1,
            interviewDetails: {
              _id: 1,
              company: 1,
              location: 1,
              designation: 1,
              mode: 1,
              date: 1,
            }
          }
        }
      ]);
      return allStudent
    } catch (error) {
      throw new Error(
        "Something went wrong while fetching student data from database",
        500
      );
    }
  }

  async addStudents(newUser) {
    console.log(newUser);
    try {
      const user = new StudentModel(newUser);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(
        "Something went wrong while adding student to database",
        500
      );
    }
  }
}
