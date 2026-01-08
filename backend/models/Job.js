const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: String,
  position: String,
  status: String,
  workType: String,
  workLocation: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Job", jobSchema);
