import React from 'react';

const Post = ({ author, timestamp, content, image }) => {
  const getProfileImage = () => {
    if (author.avatar) {
      return `data:image/jpeg;base64,${author.avatar}`;
    } else {
      const nameParams = author.name.split(' ').join('+');
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
  };

  return (
    <div className="bg-[#384754] shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={getProfileImage()}
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-base leading-6 font-medium text-white">
            {author.name}
            <span className="text-sm leading-5 font-medium text-gray-400 ml-1">
              @{author.username} - {timestamp}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-base font-medium text-offwhite whitespace-pre-wrap text-left">{content}</div>
        {image && (
          <div className="mt-4">
            <img
              className="rounded-lg w-full max-h-96 object-contain"
              src={`data:image/jpeg;base64,${image}`}
              alt="Post"
            />
          </div>
        )}
        {/* Interactions */}
        <div className="flex mt-4">
          {/* add liking and replying */}
        </div>
      </div>
    </div>
  );
};

export default Post;
