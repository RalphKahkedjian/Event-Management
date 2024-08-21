import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          await axios.get('http://127.0.0.1:8000/api/User/validateToken', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          const { name } = JSON.parse(storedUser);
          setMessage(`Welcome back, ${name}`);
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    validateToken();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = {
        email,
        password,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/User/auth', formData);

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('email', email);
      localStorage.setItem('password', JSON.stringify(password));

      setMessage("User logged in successfully");
      setLoading(false);

      setTimeout(() => {
        navigate('/home');
      }, 800);
    } catch (error) {
      setError("An error occurred! " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return(
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="container w-75 p-4 rounded shadow-sm custom-bg" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)'}}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={loading}
              required
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
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {' '}Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="my-3">
              Don't have an account ? <Link to={'/'} className="text-primary">Register</Link>
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

export default Login;
