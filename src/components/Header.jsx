import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="bg-fuchsia-500 p-4">
            <ol className="flex space-x-48 text-white">
                <li>
                    <Link to="/about"  className="hover:text-gray-950 font-medium text-2xl transition duration-300 ml-72">
                        About Page
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="hover:text-gray-950 text-2xl font-medium transition duration-300">
                        Login Page
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="hover:text-gray-950 text-2xl font-medium transition duration-300">
                        Register Page
                    </Link>
                </li>
            </ol>
        </div>
    );
}
