'use client';

import { useState } from 'react';
import Link from 'next/link';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const login_cred = {
        user_id: formData.username,
        password: formData.password,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_DOWINN_API_URL}testlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login_cred),
      });

      const data = await response.json();
    
      if (data.data === "ok") {
        console.log("Logged In")
        setIsLoggedIn(true);
      } else {
        console.log("Log In Failed")
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-screen items-center justify-center  mt-10">
      <div className=" p-8 w-[500px] bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 pb-5">
          Sign In
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* {loginError && (
            <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded">
              {loginError}
            </div>
          )} */}

          <button
            type="submit"
            disabled={isSubmitting}
            className=" w-full px-4 py-2 text-white bg-[#F3940B] rounded-lg hover:bg-[#EE750B] focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center py-3">
          <Link 
            href="/register" 
            className="text-gray-500  transition-colors"
          >
            Don't have an account yet?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;