export default function Input({ type, placeholder,name,value,onChange }) {
    return (
      <div className="mb-4">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name={name}
          value={value}
          onChange={onChange}
        
         />
      </div>
    );
  }
  