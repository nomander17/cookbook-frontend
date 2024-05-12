import React, { useState } from "react";
import request from "../../axiosHelper";
import autosize from "autosize";

const currentUser = {
  userId: 2,
  username: "Admin",
};

const CreateComment = ({ postId, setComments, onCommentCreated }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const commentDTO = {
        userId: currentUser.userId,
        postId: postId,
        text: content,
      };

      await request.post(`/posts/${postId}/comments`, commentDTO);
      const response = await request.get(`/posts/${postId}/comments`);
      setComments(response.data);
      setContent("");
      onCommentCreated();
    } catch (error) {
      console.error("Error creating comment:", error);
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
              placeholder="Add a comment..."
              ref={(textarea) => autosize(textarea)}
              style={{ maxHeight: "200px" }} // Set the maximum height limit
            ></textarea>
          </div>
          {/* Move the button next to the textarea */}
          <button className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition duration-300 ml-4">
            <span className="text-sm font-medium">Comment</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateComment;