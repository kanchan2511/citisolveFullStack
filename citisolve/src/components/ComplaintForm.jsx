

import React, { useState } from 'react'
import "../styles/ComplaintForm.css";
import { useNavigate } from 'react-router-dom';
import { ComplaintAPI } from '../services/api';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    location: "",
    category: "",
    description: "",
    photo: null
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    console.log(formData);
    setErrors(prev => ({
      ...prev, [e.target.name]: ""
    }))
  };

  const handlePhotoChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0]
    if (!selectedFile) return;
    //validate file type
    if (!selectedFile.type.startsWith("image")) {
      alert("Please select an image file")
      return;
    }
    //validate file size(5 mb max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File too large. Please upload an image under 5 MB.");
      return;
    }

    //valid file--> update form data
    setFormData((prev) => ({
      ...prev,
      photo: selectedFile,
    }));
    //clear error if any 
    setErrors((prev) => ({
      ...prev,
      photo: "",
    }));
    console.log('Selected photo:', selectedFile.name)
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (formData.ward.trim() === '') {
      newErrors.ward = "Ward is required";
    }

    if (formData.location.trim() === '') {
      newErrors.location = "Location is required";
    }

    if (formData.category.trim() === '') {
      newErrors.category = "Category is required";
    }

    if (formData.description.trim() === '') {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (!validateForm()) return;

    //send backend
    try {
      const formDataToSend = new FormData() //{} //it will have some special qualities  //browser class 

      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('ward', formData.ward.trim());
      formDataToSend.append('location', formData.location.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description.trim());
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo);
      }
      const response = await ComplaintAPI.createComplaint(formDataToSend)
      console.log(response)

    } catch (error) {
      console.log(error.message || 'Login failed.Please try again.')
    } finally {
      setIsLoading(false)
    }
    navigate('/my-complaints');
  };

  return (
    <div className="complaint-form-container">
      <div className="complaint-form">
        <h2>Submit a Complaint</h2>
        <p>Help us improve your community by reporting issues that need attention</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              name="name"
              value={formData.name}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          {/* Ward */}
          <div className="form-group">
            <label>Ward</label>
            <input
              type="text"
              placeholder="Enter your ward number or name"
              onChange={handleChange}
              name="ward"
              value={formData.ward}
            />
            {errors.ward && <span className="error-text">{errors.ward}</span>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Enter specific location (street, landmark, etc.)"
              onChange={handleChange}
              name="location"
              value={formData.location}
            />
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select
              onChange={handleChange}
              name="category"
              value={formData.category}
            >
              <option value="">Select a category</option>
              <option value="Roads & Infrastruction">Roads & Infrastruction</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Sanitation & Waste">Sanitation & Waste</option>
              <option value="Street Lighting">Street Lighting</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Environmental Issues">Environmental Issues</option>
              <option value="Noise Pollution">Noise Pollution</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the issue in detail..."
              onChange={handleChange}
              name="description"
              value={formData.description}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Photo */}
          <div className="form-group">
            <label>Photo (Optional)</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              name="photo"
              //value={formData.photo}
              accept='image/*'
            />
            {errors.photo && <span className="error-text">{errors.photo}</span>}
          </div>

          <p className="upload-info">
            Upload a photo to help us better understand the issue. Supported formats: JPG, PNG, GIF. Max size: 5MB.
          </p>

          <div className="form-actions">
            <button type="button" className="btn-cancel"
              onClick={() => navigate('/my-complaints')}>Cancel</button>
            <button type="submit" className="btn-submit">{isLoading ? "Submitting..." : "Submit Complaint"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
