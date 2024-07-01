import StudentModel from "./students.schema.js";

export default class StudentsRepository {
  // get all students
  async getAllStudents() {
    try {
        const allStudent = await StudentModel.find().populate("interviews");
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
