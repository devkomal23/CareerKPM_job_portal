import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Briefcase, Bookmark, Search, Bell, Eye, TrendingUp, User } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState({ fname: "", lname: "", role: "Job Seeker" });

  useEffect(() => {
    const data = localStorage.getItem("user");
    console.log("Raw storage data:", data);
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">JobPortal</div>
        <nav>
          <div className="nav-item active"><LayoutDashboard size={18}/> Dashboard</div>
          <div className="nav-item"><Briefcase size={18}/> Applied Jobs</div>
          <div className="nav-item"><Bookmark size={18}/> Saved Jobs</div>
          <div className="nav-item"><Search size={18}/> Browse Jobs</div>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="main-content">
        <header className="top-header">
          <input type="text" className="search-bar" placeholder="Search jobs..." />
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Bell size={20} color="#666" />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{user.fname} {user.lname}</div>
              <div style={{ color: '#888', fontSize: '12px' }}>{user.role}</div>
            </div>
            <div style={{ background: '#ddd', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
              <User size={20} style={{ margin: 'auto' }} />
            </div>
          </div>
        </header>

        <div style={{ padding: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: 0 }}>Welcome back, {user.fname}! 👋</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>Here's what's happening with your job search today.</p>
        </div>

        <div className="stats-grid">
          <StatCard icon={<Briefcase color="#2563eb"/>} bg="#eff6ff" label="Applied Jobs" count="24" trend="+3 this week" />
          <StatCard icon={<Bookmark color="#9333ea"/>} bg="#f5f3ff" label="Saved Jobs" count="18" trend="View all" />
          <StatCard icon={<Eye color="#16a34a"/>} bg="#f0fdf4" label="Profile Views" count="156" trend="+12% this month" />
          <StatCard icon={<TrendingUp color="#ea580c"/>} bg="#fff7ed" label="Recommended" count="32" trend="New matches" />
        </div>
      </div>
    </div>
  );
};

// Small component for the cards
const StatCard = ({ icon, bg, label, count, trend }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: bg }}>{icon}</div>
    <div className="stat-count">{count}</div>
    <div className="stat-label">{label}</div>
    <div style={{ color: '#2563eb', fontSize: '12px', marginTop: '15px', cursor: 'pointer' }}>{trend}</div>
  </div>
);

export default Dashboard;