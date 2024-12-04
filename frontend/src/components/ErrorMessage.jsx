import { useState, useEffect } from "react";


const ErrorMessage = ({ error }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error || !isVisible) return null;

  // Ensure error is a string for `split` to work
  const errorString = typeof error === "string" ? error : JSON.stringify(error);

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-md w-80">
      <div className="flex justify-between items-center">
        <div>
          {errorString.split("\n").map((line, index) => (
            <p key={index} className="text-sm">
              {line}
            </p>
          ))}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white ml-4 focus:outline-none"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
