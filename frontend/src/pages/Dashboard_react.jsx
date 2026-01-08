import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/";
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    fetch(`http://localhost:5000/jobs/${parsedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <p>Welcome, {user.email}</p>
      <p>user_type: {user.user_type || "User"}</p>

      <hr />

      <h3>Your Jobs</h3>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        jobs.map(job => (
          <div key={job._id} style={{ marginBottom: "10px" }}>
            <strong>{job.companyName}</strong> – {job.position}
            <br />
            {job.workType} | {job.workLocation}
          </div>
        ))
      )}
    </div>
  );
}
