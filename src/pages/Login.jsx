import { useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Import toaster CSS
import { Hourglass } from "react-loader-spinner";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";


export default function Login({ isloggedin }) {
  const navigate = useNavigate();
  const [log, setLog] = useState({
    email: "",
    password: "",
  });
  const { isLoading, setIsLoading } = useStore();
  
  // Handle input changes for login form
  function handleLogin(e) {
    const { name, value } = e.target;
    setLog((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle login button click
  async function handleClick() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, log);
      console.log("Response data:", response.data); // Log response data for debugging

      toast.success("Login successful!");
      localStorage.setItem("userId", response.data.u_id);

      if (isloggedin) {
        isloggedin(true); // Trigger login status update
      }

      setLog({
        email: "",
        password: "",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error); // Log the error
      toast.error("Login failed! Please try again.");
      
      // Optionally reset the input fields to avoid confusion
      setLog({
        email: "",
        password: "",
      });
    } finally {
      setIsLoading(false); // Stop loading after the request
    }
  }

  async function changePassword(){
    navigate("/forget");
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
        <div className="max-w-md mx-auto p-11 mt-16 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Log In</h1>

          <label className="block mb-2 text-sm font-medium">Email:</label>
          <Input
            type="email"
            placeholder="Enter your Email"
            onChange={handleLogin}
            name="email"
            value={log.email}
          />

          <label className="block mb-2 text-sm font-medium mt-4">Password:</label>
          <Input
            type="password"
            placeholder="Enter Your Password"
            onChange={handleLogin}
            name="password"
            value={log.password}
          />

          <SubmitButton
            text="Login"
            onClick={handleClick}
            className="btn-primary mt-4"
          />

         <SubmitButton
         text="Forget Password"
         onClick={changePassword}
         className="btn-primary mt-4"
         />
        </div>

       
      )}
    </>
  );
}
