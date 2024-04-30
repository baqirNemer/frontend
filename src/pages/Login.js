import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to manage navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, pass });
      setMessage('Successfully logged in. Redirecting to homepage...');
      setTimeout(() => {
        navigate('/home'); // Use navigate to redirect to '/home'
      }, 5000);
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title mb-4 text-center">Login</h5>
          {message && <div className="alert alert-info text-center">{message}</div>}
          <form>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div className="form-row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me?
                  </label>
                </div>
              </div>

              <div className="col text-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <div className="text-center">
              <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                Sign in
              </button>
            </div>

            <div className="text-center mt-3">
              <p>Not a member? <Link to="/signuppage">Register</Link></p>
              <p>or sign up with:</p>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;