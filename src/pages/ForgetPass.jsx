import { useState } from "react";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toaster CSS
import { Hourglass } from "react-loader-spinner";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

export default function ForgetPass() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { isLoading, setIsLoading } = useStore();

  // Handle input changes for forget password form
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle password update button click
  async function handlePasswordUpdate() {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/api/forget`, data);
      console.log("Response data:", response.data); // Log response data for debugging
      
      toast.success("Password updated successfully!");

      // Clear form inputs after successful password change
      setData({
        email: "",
        password: "",
      });

      navigate("/login"); // Navigate to login page after successful update
    } catch (error) {
      console.error("Password update error:", error); // Log the error
      toast.error("Failed to update password! Please try again.");
    } finally {
      setIsLoading(false); // Stop loading after the request
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
        <div className="max-w-md mx-auto p-11 mt-16 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

          <label className="block mb-2 text-sm font-medium">Email:</label>
          <Input
            type="email"
            placeholder="Enter your Email"
            onChange={handleChange}
            name="email"
            value={data.email}
          />

          <label className="block mb-2 text-sm font-medium mt-4">New Password:</label>
          <Input
            type="password"
            placeholder="Enter your New Password"
            onChange={handleChange}
            name="password"
            value={data.password}
          />

          <SubmitButton
            text="Update Password"
            onClick={handlePasswordUpdate}
            className="btn-primary mt-4"
          />
        </div>
      )}
    </>
  );
}
