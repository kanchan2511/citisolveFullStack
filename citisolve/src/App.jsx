import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import ComplaintForm from './components/ComplaintForm'
import MyComplaint from './components/MyComplaint'
const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
           <Route path='/complaintForm' element={<ComplaintForm />} />
           <Route path='/my-complaints' element={<MyComplaint />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App