const CreateLoading = () => {
  return (
    <div className="bg-[#384754] shadow-md mt-5 rounded-lg p-4 animate-pulse">
      <div className="flex">
        <div className="mr-4">
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex-1">
          <div className="h-6 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-64 bg-gray-300 rounded mt-2"></div>
          <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="h-8 w-24 bg-gray-300 rounded mb-2 sm:mb-0"></div>
          <div className="h-8 w-24 bg-gray-300 rounded mb-2 sm:mb-0 sm:ml-2"></div>
          <div className="h-8 w-16 bg-gray-300 rounded mb-2 ml-2 md:mb-0 md:ml-4"></div>
          <div className="h-8 w-24 bg-gray-300 rounded ml-auto"></div>
        </div>
      </div>
    </div>
  );
};
export default CreateLoading;
