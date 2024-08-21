import React, { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        name,
        email,
        password,
        age,
        role
      };
  
      setTimeout(async () => {
        const response = await axios.put('http://127.0.0.1:8000/api/User/auth', formData);
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('name' , user.name);
        localStorage.setItem('email', user.email);
    
        setMessage("User registered successfully");
        setLoading(false);
    
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }, 6000);
    
    } catch (error) {
      setError("An error occurred! " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="container w-75 p-4 rounded shadow-sm custom-bg" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)'}}>
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role (organizer or attendee)"
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              disabled={loading}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {' '}Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="my-3">
              Already have an account? <Link to={'/login'}>Login</Link>
            </p>
          </div>
        </form>
        {message &&
          <div className="alert alert-success mt-3">
            {message}
          </div>
        }
        {error &&
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        }
      </div>
    </div>
  );
}

export default Registration;
