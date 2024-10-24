export default function About() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-4">About Us</h1>
            <p className="text-gray-700 mb-4">
                We are dedicated to providing top-notch services and building lasting relationships based on trust and transparency.
            </p>
            <div className="flex justify-center mb-4">
                <img
                    src="./todo.jpg" // Replace with your image URL
                    alt="About Us"
                    className="rounded-lg"
                />
            </div>
            <h2 className="text-2xl font-semibold text-center mb-2">Our Mission</h2>
            <p className="text-gray-700 text-center">
                To deliver high-quality services with integrity and excellence.
            </p>
        </div>
    );
}
