import { useState, useEffect } from "react";
import autosize from "autosize";

export const EditModal = ({ row, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(row);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    const base64Image = await convertImageToBase64(file);
    setFormData({ ...formData, [key]: base64Image.split(",")[1] });
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.className.includes("fixed z-10 inset-0 overflow-y-auto")) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Edit Row
            </h3>
            <form onSubmit={handleSubmit}>
              {Object.entries(row).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    {key}
                  </label>
                  {key === "image" || key === "avatar" ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, key)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {formData[key] && (
                        <img
                          src={`data:image/jpeg;base64,${formData[key]}`}
                          alt="Preview"
                          className="mt-2 max-w-xs max-h-40"
                        />
                      )}
                    </div>
                  ) : typeof value === "object" ? (
                    <div>
                      {Object.entries(value).map(([subKey, subValue]) => {
                        if (subKey.toLowerCase().includes("id")) {
                          return (
                            <div key={subKey}>
                              <label className="block text-gray-700 font-bold mb-2">
                                {subKey}
                              </label>
                              <input
                                type="text"
                                name={`${key}.${subKey}`}
                                value={subValue}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                readOnly
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : key.toLowerCase().includes("time") ? (
                    <input
                      type="datetime-local"
                      name={key}
                      value={formData[key]?.slice(0, 19)}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  ) : (
                    <textarea
                      name={key}
                      value={
                        typeof formData[key] === "object"
                          ? JSON.stringify(formData[key], null, 2)
                          : formData[key]
                      }
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      ref={(textarea) => autosize(textarea)}
                    />
                  )}
                </div>
              ))}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
