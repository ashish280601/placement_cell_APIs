import moment from "moment";
import InterviewsRepository from "./interviews.repository.js";

export default class InterivewsController {
  constructor() {
    this.InterviewsRepository = new InterviewsRepository();
  }
  async getCompany(req, res) {
    try {
      const getCompany = await this.InterviewsRepository.getCompany();
      return res.status(200).json({
        data: getCompany,
        message: "Company data fetch successfully",
        status: true,
      });
    } catch (error) {
      console.log("Error While fetching Company", error);
      return res.status(500).send({
        message: "Something wents wrongs",
        status: false,
      });
    }
  }

  async addCompany(req, res) {
    const { company, location, designation, date, mode } = req.body;
    try {
      const parsedDate = moment(date, "DD-MM-YYYY").toDate();
      const addCompany = await this.InterviewsRepository.addInterview(
        company,
        location,
        designation,
        parsedDate,
        mode
      );
      return res.status(201).json({
        data: addCompany,
        message: "Company added successfully",
        status: true,
      });
    } catch (error) {
      console.log("Error While Creating Interview", error);
      return res.status(500).send({
        message: "Something wents wrongs",
        status: false,
      });
    }
  }

  async allocateInterview(req, res) {
    try {
      const { studentsId } = req.body;
      const id = req.params.companyId;
  
      console.log("body", req.body);
      if (!studentsId || !Array.isArray(studentsId) || studentsId.length === 0) {
        return res.status(400).json({
          data: {
            message: "Student not found",
            status: false,
          },
        });
      } else if (!id) {
        return res.status(400).json({
          data: {
            message: "Company not found",
            status: false,
          },
        });
      }
  
      const assignInterview = await this.InterviewsRepository.allocateInterview(
        studentsId,
        id
      );
      console.log("assignIntervie", assignInterview);
      if (!assignInterview) {
        return res.status(400).json({
          data: {
            message: "Failed to assign interview",
            status: false,
          },
        });
      }
      return res.status(200).json({
        data: {
          assignInterview,
          message: "Interview assigned successfully",
          status: true,
        },
      });
    } catch (error) {
      console.log("Error while creating interview", error);
      return res.status(500).json({
        data: {
          message: "Something went wrong",
          status: false,
        },
      });
    }
  }
}
