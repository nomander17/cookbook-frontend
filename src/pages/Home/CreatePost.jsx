import { Image, Send, X } from "lucide-react";
import React, { useState } from "react";
import request from "../../axiosHelper";
import autosize from "autosize";

const CreatePost = ({ setPosts }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
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
        userId: 1, // Hardcoded userId for now
        text: content,
        image: base64Image ? base64Image.split(",")[1] : null,
      };

      await request.post("/posts", postDTO);
      const resposnse = await request.get("/posts");
      setPosts(resposnse.data);
      setContent("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-[#384754] shadow-md mt-5 rounded-lg p-4">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="https://ui-avatars.com/api/name=John+Doe"
              alt=""
            />
          </div>
          <div className="flex-1">
            <textarea
              className="bg-transparent p-3 text-offwhite font-medium text-lg w-full focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
              value={content}
              onChange={handleContentChange}
              placeholder="What's cooking?"
              ref={(textarea) => autosize(textarea)}
              style={{ maxHeight: "200px" }} // Set the maximum height limit
            ></textarea>
          </div>
        </div>
        {selectedImage && (
          <div className="mt-4 relative">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="max-w-full rounded-lg hover:drop-shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
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
          <div>
            <button className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300">
              <Send className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Post</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
