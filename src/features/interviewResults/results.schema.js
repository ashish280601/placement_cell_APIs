import { Schema, model } from "mongoose";

const resultsSchema = new Schema({
  interview: {
    type: Schema.Types.ObjectId,
    ref: "Interviews",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  result: {
    type: String,
    enum: ["Pass", "Fail", "Didn't Attempt", "On Hold"],
    required: true,
  },
});

const ResultsModel = model("Results", resultsSchema);

export default ResultsModel;
