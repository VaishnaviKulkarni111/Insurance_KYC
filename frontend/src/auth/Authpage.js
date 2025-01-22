import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Authpage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, userType } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fname: '',
    mobile: '',
    userType: '',
  });

  useEffect(() => { 
    if (token) {
      if (userType === 'admin') {
        navigate('/admin');
      } else if (userType === 'user') {
        navigate('/user-board');
      }
    }
  }, [token, userType, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ emailOrMobile: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser({
        fname: formData.fname,
        email: formData.email,
        mobile: formData.mobile, 
        password: formData.password,
        userType: formData.userType,
      }));
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <div className="container my-auto">
        <div className="row align-items-center">
          {/* Left Section: Informative Content */}
          <div className="col-md-6 d-none d-md-block">
            <div className="info-section p-4">
              <h2 className="text-primary fw-bold mb-3">
                Why Choose Our Insurance Platform?
              </h2>
              <p className="text-muted">
                Enjoy a seamless onboarding experience with our user-friendly platform:
              </p>
              <ul className="list-unstyled text-muted">
                <li>
                  <strong>✔️ Fast KYC Verification:</strong> Get approved in minutes.
                </li>
                <li>
                  <strong>✔️ 24/7 Support:</strong> Assistance whenever you need it.
                </li>
                <li>
                  <strong>✔️ Comprehensive Policies:</strong> Choose from a variety of insurance plans tailored to your needs.
                </li>
              </ul>
              <img
                src="https://www.example.com/insurance-illustration.png"
                alt="Insurance Illustration"
                className="img-fluid mt-3"
              />
            </div>
          </div>
  
          {/* Right Section: Authentication Form */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4">
              <h1 className="card-title text-center mb-4">
                {isLogin ? 'Welcome Back!' : 'Create an Account'}
              </h1>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="form-control"
                    />
                  </div>
                )}
  
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                  />
                </div>
  
                {!isLogin && (
                  <div className="mb-3">
                    <input
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="form-control"
                    />
                  </div>
                )}
  
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="form-control"
                  />
                </div>
  
                {!isLogin && (
                  <div className="mb-3">
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                )}
  
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                </button>
  
                {error && <p className="text-danger text-center mt-2">{error}</p>}
  
                <p className="text-center mt-4">
                  {isLogin ? (
                    <>
                      Don’t have an account?{' '}
                      <span
                        className="text-primary cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsLogin(false)}
                      >
                        Sign Up
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <span
                        className="text-primary cursor-pointer"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsLogin(true)}
                      >
                        Login
                      </span>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Authpage;
