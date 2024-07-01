import "../../../env.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // singUp
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      // encrypting my password
      const hashPassword = await bcrypt.hash(password, 10);

      const user = { name, email, password: hashPassword };

      const newUser = await this.userRepository.signUp(user);
      return res.status(201).json({
        data: newUser,
        message: "Account created successfully",
        status: true,
      });
    } catch (error) {
      console.log("Error while creating accound", error);
      if (
        error.message ===
        "Something went wrong in database while adding new user"
      ) {
        return res.status(400).json({
          data: error,
          message: "User Already Exist!",
          status: false,
        });
      }
      return res.status(500).json({
        data: error,
        message: "Something went wrongs while creating an account",
        status: false,
      });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          data: {},
          message: "Invalid Email Credential",
          status: false,
        });
      } else {
        // console.log("userPassword", user.password);
        // console.log("password", password);
        const result = await bcrypt.compare(password, user.password);
        // console.log("result", result);
        if (result) {
          const token = jwt.sign(
            {
              userID: user._id,
              userEmail: user.email,
              userName: user.name,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1hr",
            }
          );
          return res.status(200).json({
            data: {
              token,
              message: "Login Successful",
              status: true,
            },
          });
        }
        return res.status(400).json({
          data: {},
          message: "Invalid Password Credential",
          status: false,
        });
      }
    } catch (error) {
      console.log("Error while logIn", error);
      return res.status(500).json({
        data: {},
        message: "Something went wrongs while login an account",
        status: false,
      });
    }
  }
}
