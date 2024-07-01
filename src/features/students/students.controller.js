import StudentsRepository from "./students.repository.js";

export default class StudentsController {
    constructor(){
        this.studentRepository = new StudentsRepository();
    }
  // method to show all the students
  async getAllStudents(req, res) {
    try {
        const allStudent = await this.studentRepository.getAllStudents();
        if(!allStudent){
          return res.status(400).jsno({
            data:{
              message: "Data not found",
              status: false
            }
          })
        }
        return res.status(200).json({
            allStudent,
            message: "Student Data Fetch Successfully",
            status: true
        })
    } catch (error) {
      console.log("Error while showing students", error);
      return res.status(500).json({
        message: "Something went wrongs",
        status: 500,
      });
    }
  }

  async addStudents(req, res) {
    try {
      const { name, college, batch, status, score } = req.body;
       // Basic validation
       if (!name || !college || !batch || !status || typeof score === 'undefined') {
        return res.status(400).json({
          message: "All fields are required",
          status: false,
        });
      }

      const newUser = {
        name,
        college,
        batch,
        status,
        score,
      };
      const user = await this.studentRepository.addStudents(newUser);
      console.log(user);
      return res.status(200).json({
        user,
        message: "Student added successfully",
        status: true,
      })
    } catch (error) {
      console.log("Error while adding student", error);
      return res.status(500).json({
        message: "Something went wrongs",
        status: 500,
      });
    }
  }
}
