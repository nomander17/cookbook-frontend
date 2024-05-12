import { useState } from "react";
import request from "../../axiosHelper";
import autosize from "autosize";
import { Image, X } from "lucide-react";

const currentUser = {
  userId: 2,
};

const CreateComment = ({ postId, setComments, replyInFocus }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commentDTO = {
      userId: currentUser.userId,
      postId: postId,
      text: content,
    };
    try {
      await request.post(`/posts/${postId}/comments`, commentDTO);
      const response = await request.get(`/posts/${postId}/comments`);
      setComments(response.data);
      setContent("");
    } catch (error) {
      console.error("Error posting comment", error);
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
              className="bg-transparent p-3 max-h-52 text-offwhite font-medium text-lg w-full focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
              value={content}
              onChange={handleContentChange}
              placeholder="Add a comment..."
              ref={(textarea) => autosize(textarea)}
              autoFocus={replyInFocus}
            ></textarea>
          </div>
          {/* Move the button next to the textarea */}
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
          <button className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ml-4">
            <span className="text-sm font-medium">Comment</span>
          </button>
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
      </div>
    </form>
  );
};

export default CreateComment;
