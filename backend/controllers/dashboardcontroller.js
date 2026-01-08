exports.getDashboardData = (req, res) => {
  res.json({
    user: { name: "John Doe", user_type: "Job Seeker" },
    stats: {
      applied: 74,
      saved: 18,
      views: 156,
      recommended: 32
    },
    applications: []
  });
};
