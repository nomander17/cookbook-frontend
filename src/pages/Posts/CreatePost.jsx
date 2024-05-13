import { Image, Pencil, Send, SquareGanttChart, X } from "lucide-react";
import React, { useState } from "react";
import axios from "../../api/axios";
import autosize from "autosize";
import MarkdownIt from "markdown-it";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

// Current userId is the user currently logged in
// import jwt_decode from "jwt-decode";

// const token = localStorage.getItem('token');
// const currentUser = token ? jwt_decode(token) : null;
// maybe the root will handle this with useContext?

// for now it is 1

const currentUser = {
  userId: 2,
  username: "Admin",
};

const mdParser = new MarkdownIt();

const CreatePost = ({ setPosts }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const wordCountLimit = 2800;
  const authHeader = useAuthHeader();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    setWordCount(event.target.value.length);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let base64Image = null;
      if (selectedImage) {
        base64Image = await convertImageToBase64(selectedImage);
      }

      const postDTO = {
        userId: currentUser.userId,
        text: content,
        image: base64Image ? base64Image.split(",")[1] : null,
      };

      await axios.post("/posts", postDTO, {
        headers: {
          Authorization: authHeader,
        },
      });
      const resposnse = await axios.get("/posts", {
        headers: {
          Authorization: authHeader,
        },
      });
      setPosts(resposnse.data);
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#384754] shadow-md mt-5 rounded-lg p-4">
        <div className="flex">
          <div className="mr-4">
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="https://ui-avatars.com/api/name=John+Doe"
              alt=""
            />
          </div>
          <div className="flex-1">
            {isPreviewMode ? (
              <div
                className="bg-transparent p-3 text-offwhite font-medium text-lg w-full text-left whitespace-pre rounded-lg"
                dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
              />
            ) : (
              <textarea
                className="bg-transparent p-3 text-offwhite font-medium text-lg w-full focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
                value={content}
                onChange={handleContentChange}
                placeholder="What's cooking?"
                ref={(textarea) => autosize(textarea)}
                style={{ maxHeight: "200px" }}
              ></textarea>
            )}
          </div>
        </div>
        {selectedImage && (
          <div className="mt-4 flex justify-center">
            <div className="relative">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="max-w-full max-h-96 rounded-lg hover:drop-shadow-lg"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        {/* buttons tray */}
        {/* buttons tray */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between">
            {/* Image button */}
            <div className="flex items-center mb-2 sm:mb-0">
              <label htmlFor="imageInput" className="cursor-pointer">
                <div className="flex items-center text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition duration-300">
                  <Image className="h-6 w-6 mr-2" />
                  <span className="text-sm font-medium">Image</span>
                </div>
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Preview/Edit button */}
            <button
              type="button"
              onClick={togglePreview}
              className="flex items-center text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition duration-300 mb-2 sm:mb-0 sm:ml-2"
            >
              {isPreviewMode ? (
                <>
                  <Pencil className="h-6 w-6 mr-2" />
                  <span className="text-sm font-medium">Edit</span>
                </>
              ) : (
                <>
                  <SquareGanttChart className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Preview</span>
                </>
              )}
            </button>

            {/* Word count */}
            <span
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 text-sm mb-2 sm:mb-0 sm:ml-4
        ${wordCount > wordCountLimit ? "bg-red-600" : ""}
      `}
            >
              {wordCount}/{wordCountLimit}
            </span>

            {/* Post button */}
            <div className="ml-auto">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-50
        "
                disabled={wordCount > wordCountLimit}
              >
                <Send className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
