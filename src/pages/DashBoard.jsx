import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Hourglass } from "react-loader-spinner";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    const id = localStorage.getItem("userId");
    console.log("User ID:", id);
    const config = {
      headers: {
        u_id: Number(id),
      },
    };
    console.log("API Request Config:", config);
    const { data } = await axios.get(`${API_URL}/api/todos`, config);

    console.log(data);
    setTodos(data);
  }

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(`${API_URL}/api/add/todos`, {
          content: newTodo,
          id: Number(userId),
        });

        const addedTodo = response.data;
        setTodos([...todos, addedTodo]);
        setNewTodo(""); // Clear the input after adding
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // Edit a todo
  const editTodo = (id, content) => {
    setEditId(id); // Set the current todo ID to edit
    setEditText(content); // Set the current content to the edit text
  };

  // Save edited todo
  const saveTodo = async (id) => {
    if (editText.trim()) {
      try {
        const response = await axios.patch(`${API_URL}/api/patch/todos`, {
          id: id,
          content: editText,
        });

        const updatedTodos = todos.map((todo) =>
          todo.t_id === id ? { ...todo, content: editText } : todo
        );

        setTodos(updatedTodos);
        setEditId(null); // Reset edit mode
        setEditText(""); // Clear the edit input
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    console.log("Attempting to delete todo with ID:", id); // Log the ID
    try {
      await axios.delete(`${API_URL}/api/del/todos`, { data: { id: Number(id) } });
      setTodos(todos.filter((todo) => todo.t_id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Logout
  const handleLogout = (e) => {
   e.preventDefault();
    localStorage.removeItem("userId"); // Clear user session from localStorage
    toast.success("Logout Successful"); // Show a success toast message
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">ToDo Dashboard</h1>

        {/* Input for new todo */}
        <div className="flex mb-4">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <ul className="max-h-60 overflow-y-auto">
          {todos.map((todo) => (
            <li key={todo.t_id} className="flex justify-between items-center p-2 border-b">
              {editId === todo.t_id ? (
                <input
                  type="text"
                  value={editText}
                  className="border border-gray-300 p-1 w-full rounded-md mr-2"
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={`flex-1 ${todo.isDone ? "line-through text-gray-500" : ""}`}>
                  {todo.content}
                </span>
              )}

              <div className="flex space-x-2">
                {editId === todo.t_id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                    onClick={() => saveTodo(todo.t_id)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                      onClick={() => editTodo(todo.t_id, todo.content)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                      onClick={() => deleteTodo(todo.t_id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Logout button */}
        <div className="mt-auto">
          <button type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 mt-11 ml-24 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
