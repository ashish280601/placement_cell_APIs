import UserModel from "./user.schema.js";

export default class UserRepository {
  async signUp(newUser) {
    try {
      const user = new UserModel(newUser);

      await user.save();
      return user;
    } catch (error) {
      throw new Error(
        "Something went wrong in database while adding new user",
        500
      );
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(
        "Something went wrong in database while adding new user",
        500
      );
    }
  }
}
