import { X } from "lucide-react";
import { useState, useEffect } from "react";
const SuccessNotification = ({ content, onClose }) => {
  return (
    <div
      id="toast-success"
      className="flex items-center justify-between w-full max-w-xs p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow"
      role="alert"
    >
      <div className="flex items-center">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-200 bg-green-800 rounded-lg">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">{content}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-400 hover:text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-700 inline-flex h-8 w-8"
        aria-label="Close"
        onClick={onClose}
      >
        <X onClick={onClose} className="pb-1" />
      </button>
    </div>
  );
};

const ErrorNotification = ({ content, onClose }) => {
  return (
    <div
      id="toast-danger"
      className="flex items-center justify-between w-full max-w-xs p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg shadow"
      role="alert"
    >
      <div className="flex items-center">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-800 rounded-lg">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        </div>
        <div className="ms-3 text-sm font-normal">{content}</div>
      </div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-400 hover:text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-700 inline-flex h-8 w-8"
        aria-label="Close"
        onClick={onClose}
      >
        <X onClick={onClose} className="pb-1" />
      </button>
    </div>
  );
};

function Notification({ category, content, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [category, content]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  if (category === "success") {
    return <SuccessNotification content={content} onClose={handleClose} />;
  } else if (category === "error") {
    return <ErrorNotification content={content} onClose={handleClose} />;
  }

  return null;
}

export default Notification;
