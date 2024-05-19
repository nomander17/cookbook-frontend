import { Image, Pencil, Send, SquareGanttChart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import autosize from "autosize";
import MarkdownIt from "markdown-it";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAuthUserContext } from "../../context/AuthUserContext";
const mdParser = new MarkdownIt();

const CreatePost = ({ setPosts }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const wordCountLimit = 2800;
  const authHeader = useAuthHeader();
  const { authUser } = useAuthUserContext();
  const [profileImage, setProfileImage] = useState("");

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
        userId: authUser.userId,
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

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`/users/${authUser.userId}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        const user = response.data;
        if (user.avatar === null) {
          const nameParams = user.name.split(" ").join("+");
          setProfileImage(
            `https://ui-avatars.com/api/?name=${nameParams}&background=random`
          );
        } else {
          setProfileImage(`data:image/jpeg;base64,${user.avatar}`);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchProfileImage();
  }, [authUser.userId, authHeader]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#384754] shadow-md mt-5 rounded-lg p-4">
        <div className="flex">
          <div className="mr-4">
            <img
              className="inline-block h-12 w-12 rounded-full"
              src={profileImage}
              alt=""
            />
          </div>
          <div className="flex-1">
            {isPreviewMode ? (
              <div
                className="bg-transparent p-3 text-offwhite font-medium text-lg w-full text-left whitespace-prewrap rounded-lg markdown-class"
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
        {/* TODO Dynamic buttons */}
        {/* buttons tray */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center text-xs md:text-sm justify-between">
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
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center transition duration-300 text-sm mb-2 md:mb-0 md:ml-4
        ${wordCount > wordCountLimit ? "bg-red-600" : ""}
      `}
            >
              {wordCount}/{wordCountLimit}
            </span>

            {/* Post button */}
            <div className="ml-auto my-auto">
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
