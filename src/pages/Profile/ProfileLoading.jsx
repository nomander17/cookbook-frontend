const ProfileLoading = () => {
  return (
    <div className="flex flex-col md:flex-row items-center animate-pulse">
      <div className="mb-6 md:mb-0 md:mr-8">
        <div className="h-32 w-32 rounded-full bg-gray-300"></div>
      </div>
      <div className="w-full md:w-3/4 ml-auto">
        <div className="bg-[#2c3a47] rounded-lg p-4">
          <div className="h-8 w-48 bg-gray-400 rounded mb-4"></div>
          <div className="h-6 w-32 bg-gray-400 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};
export default ProfileLoading;
