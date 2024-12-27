import React, { useState } from 'react';
import '../Css/RegisterForm.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

axios.defaults.withCredentials = true;


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        email,
        password,
      });
      console.log(response);
      setSuccess(true);
      setPassword("");
      setUsername("");
      setEmail("");
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="registerform ml-5">
        <div className="mt-5">
          <h2 className="register font-bold">Register</h2>
          <Link to="/login">
            <button type="button" className="demo">
              Already have an account? <span className="loginbtn">Login</span>
            </button>
          </Link>
        </div>
        <form className="form1" onSubmit={submitHandler}>
          <div>
            <label className="errlabel">Username</label>
            <input
              className="username border-none"
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="errlabel">Email</label>
            <input
              className="email border-none"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="errlabel">Password</label>
            <input
              className="password border-none"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          {error && 
          <div role="alert" className="alert alert-error absolute h-14 right-0 left-4 top-40 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>All details should be filled correctly.</span>
        </div>}


          {success && 
          <div role="alert" className="alert alert-success absolute h-14 right-0 left-4 top-40 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Registered successfully.</span>
        </div>}


          <button type="submit" className="submit bg-current" disabled={isLoading}>
            <div className="text-secondary font-semibold">{isLoading ? "Submitting..." : "Submit"}</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
