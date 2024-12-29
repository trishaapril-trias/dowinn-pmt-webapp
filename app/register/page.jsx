"use client";
import { useState } from "react";
import Link from "next/link";
import HeaderTitle from "@components/HeaderTitle";
import { addMember } from "@hooks/member";
import toast from "@node_modules/react-hot-toast/dist";
import { useRouter } from "@node_modules/next/navigation";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (formData.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    const data = {
      user_id: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const response = await addMember(data);


    if(response !== "Member Already Exist"){
      router.push('/login')
      toast.success("Registered Succefully")
    }else{
      toast.error(response)
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex-center flex-col">
      <HeaderTitle />
      <div className="flex w-screen items-center justify-center  mt-10">
        <div className=" p-8 w-[500px] bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 pb-5">
            Sign Up
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
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
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
                  errors.password ? "border-red-500" : "border-gray-300"
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
              {isSubmitting ? "Signing up..." : "Register"}
            </button>
          </form>

          <div className="text-center py-3">
            <Link href="/login" className="text-gray-500  transition-colors">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
