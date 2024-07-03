import mongoose, { Schema } from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Placed", "Not Placed"],
    required: true,
  },
  score: {
    DSA_Score: {
      type: Number,
      required: true,
    },
    Web_Score: {
      type: Number,
      required: true,
    },
    React_Score: {
      type: Number,
      required: true,
    },
  },
});

const StudentModel = mongoose.model("Students", studentSchema);

export default StudentModel;
