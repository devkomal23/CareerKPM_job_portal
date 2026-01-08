const Job = require("../models/Job");

exports.getJobsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const jobs = await Job.find({ createdBy: userId });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Unable to load dashboard" });
  }
};
