const ContentLoading = () => {
  return (
    <div className="bg-[#384754] shadow-md rounded-lg p-4 mb-4 animate-pulse">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
        <div className="ml-3">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-64 bg-gray-300 rounded mt-2"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
      </div>
      <div className="mt-4">
        <div className="h-48 w-full bg-gray-300 rounded"></div>
      </div>
      <div className="flex justify-start items-center mt-4">
        <div className="h-8 w-24 bg-gray-300 rounded mr-5"></div>
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
export default ContentLoading;
