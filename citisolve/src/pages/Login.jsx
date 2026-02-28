

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
const Login = () => {


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors(prev => ({
      ...prev, [e.target.name]: ""
    }))
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true)
    //send the data to the backend database
    try {
      const response = await authAPI.login(formData)
      console.log(response)
      localStorage.setItem('token', response.token)
      localStorage.setItem('userRole', response.user.role)
      localStorage.setItem('userName', response.user.name)
      localStorage.setItem('userId', response.user._id)
      login(response.user.name)
      navigate('/my-complaints');
    } catch (error) {
      console.log(error.message)
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }

    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.includes("@")) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to our page</h2>

        {errorMessage && <div className='error-message'>{errorMessage}</div>}


        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              onChange={handleChange}
              className="form-input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="button-container">
            <button type='submit' className="login-btn">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p className="register-text">
            Don’t have an account? <Link to='/register' className="register-link">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login