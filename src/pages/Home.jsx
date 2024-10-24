import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>
            <p className="text-lg mb-8">Manage your tasks efficiently.</p>
            <div className="space-x-4">
                <Link to="/register">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                </Link>
                <Link to="/login">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
                </Link>
            </div>
        </div>
    );
}
