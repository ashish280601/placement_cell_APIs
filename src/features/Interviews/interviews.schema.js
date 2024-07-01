import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const interviewSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  ]
});

const InterviewsModel = model("Interviews", interviewSchema);

export default InterviewsModel;
