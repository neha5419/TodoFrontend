export default function SubmitButton({ text,onClick, className }) {
    return (
      <button onClick={onClick} className={`bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-28 rounded ${className}`}>
        {text}
      </button>
    );
  }
  