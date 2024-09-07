import { useNavigate } from "react-router-dom";

export default function PrimaryButton({ text, to, disabled = false, onClick }) {
  const navigate = useNavigate();

  function handleClick() {
    if (to && !disabled) {
      navigate(to);
    }
  }

  return (
    <button
      onClick={onClick || handleClick}
      className={`inline-block ${
        disabled ? "bg-gray-400 cursor-not-allowed flex justify-center" : "bg-blue-500 hover:bg-blue-600"
      } text-white text-base text-center font-bold py-2 px-4 rounded`}
      disabled={disabled}
    >
      {disabled ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 16.67c1.463 0 2.807.558 3.857 1.474L7.404 16A5.978 5.978 0 014 12.67h-2z"
            ></path>
          </svg>
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
