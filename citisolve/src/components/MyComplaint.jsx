import React, { useEffect, useState } from 'react';
import { ComplaintAPI } from '../services/api.js';
import { Link } from 'react-router-dom';
import "../styles/MyComplaint.css";

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await ComplaintAPI.getComplaints();
        console.log("Fetched complaints:", data);
        setComplaints(data);
      } catch (err) {
        console.error("Error fetching complaints:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (isLoading) return <p>Loading complaints...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="my-complaints-container">

      {/* Header */}
      <div className="my-complaints-header">
        <h1>My Complaints</h1>
        <p>Track the status of your submitted complaints</p>

        {/* Filter + New Complaint */}
        <div className="header-actions">

          {/* Status Filter */}
          <div className="filter-controls">
            <label htmlFor="status-filter">Filter by status:</label>
            <select id="status-filter" className="status-filter">
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* New Complaint Button */}
          <Link to="/complaintform" className="new-complaint-btn">
            Submit New Complaint
          </Link>

        </div>
      </div>

      {/* Complaints Grid */}
      <div className="complaints-grid">
        {/* complaint card section here */}
        {complaints.length === 0 ? (
          <div className="empty-state">
            <h3>No complaints yet</h3>
            <p>You haven’t submitted any complaints.</p>
          </div>
        ) : (
          complaints.map((complaint) => {
            return (
              <div key={complaint._id} className='complaint-card'>
                <div className='complaint-header'>
                  <h3>Complaint ID: {complaint.complaintId}</h3>
                  <span
                    className={`status-badge ${complaint.status?.toLowerCase().replace(" ", "-")}`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <div className="complaint-details">
                  <div><strong>Name:</strong> {complaint.name}</div>
                  <div><strong>Ward:</strong> {complaint.ward}</div>
                  <div><strong>Location:</strong> {complaint.location}</div>
                  <div><strong>Category:</strong> {complaint.category}</div>

                  <div>
                    <strong>Date Submitted:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="complaint-description">
                  <strong>Description:</strong>
                  <p>{complaint.description}</p>
                </div>


              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default MyComplaint;