import React, { useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import toaster CSS
import { Hourglass } from "react-loader-spinner";
import axios from "axios";
import { API_URL } from "../utils/constants";
import useStore from "../store/useStore";
export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {isLoading, setIsLoading} = useStore();

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Register user function
  async function registerUser() {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, user);
      console.log("User registered:", response.data);
      
      // Show success toaster
      toast.success("User registered successfully!");

      // Clear form fields after successful registration
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Optionally show an error toaster
      toast.error("Registration failed! Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer /> {/* Add this to display the toast messages */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            colors={['#306cce', '#72a1ed']}
          />
        </div>
      ) : (
        <div className="max-w-md mx-auto p-11 mt-2 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <p className="text-center text-gray-700 mb-4 text-lg font-semibold bg-gray-100 py-2 px-4 rounded-lg shadow-md">
  Hello {user.name}
</p>

          <label className="block mb-2 text-sm font-medium">Name:</label>
          <Input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={handleChange}
            value={user.name}
          />
          
          <label className="block mb-2 text-sm font-medium">Email:</label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            value={user.email}
          />
          
          <label className="block mb-2 text-sm font-medium mt-4">Password:</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
            value={user.password}
          />
          
          <SubmitButton
            text="Register"
            onClick={registerUser}
            className="btn-primary mt-4"
          />
        </div>
      )}
    </>
  );
}

