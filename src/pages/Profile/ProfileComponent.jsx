import { useEffect, useState } from "react";
import Notification from "../../components/Notifications";
import { useAuthUserContext } from "../../context/AuthUserContext";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CircleX, Edit2, Image, Trash, X } from "lucide-react";
import useNotification from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import ProfileLoading from "./ProfileLoading";

export default function ProfileComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState({
    userId: 0,
    email: "",
    username: "",
    name: "",
    avatar: "NO AVATAR",
  });
  const [isEditing, setIsEditing] = useState(false);
  const authHeader = useAuthHeader();
  const { authUser, setAuthUser } = useAuthUserContext();
  const { notification, showNotification, hideNotification } =
    useNotification();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const signOut = useSignOut();
  const signIn = useSignIn();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        if (authUser.userId) {
          const response = await axios.get(
            `/users/${authUser.userId}/profile`,
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
          setUser({
            userId: response.data.userId,
            email: response.data.email,
            username: response.data.username,
            name: response.data.name,
            avatar: response.data.avatar,
          });
        }
      } catch (error) {
        console.error();
        showNotification("error", error.response.data);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const getProfileImage = () => {
    if (user.avatar) {
      return `data:image/jpeg;base64,${user.avatar}`;
    } else {
      const nameParams = user.name.split(" ").join("+");
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
  };

  const handleEditClick = () => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    user.avatar = null;
  };

  const openDeletePopup = () => {
    const deleteDialog = document.getElementById("deleteDialog");
    if (deleteDialog) {
      deleteDialog.showModal();
    }
  };

  const closeDeletePopup = () => {
    const deleteDialog = document.getElementById("deleteDialog");
    if (deleteDialog) {
      deleteDialog.close();
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${user.userId}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      signOut();
      setAuthUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      showNotification("error", "Failed to delete account");
    }
  };

  const handleInputChange = (e) => {
    setEditingUser({
      ...editingUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedImagePreview = () => {
    if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    } else if (user.avatar) {
      return `data:image/jpeg;base64,${user.avatar}`;
    } else {
      const nameParams = user.name.split(" ").join("+");
      return `https://ui-avatars.com/api/?name=${nameParams}&background=random`;
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let base64Image;
      if (selectedImage) {
        base64Image = await convertImageToBase64(selectedImage);
      }
      const updatedUser = {
        ...editingUser,
        avatar: base64Image ? base64Image.split(",")[1] : user.avatar, // Use existing user avatar if no new image selected
      };
      const response = await axios.put(
        `/users/${user.userId}/profile`,
        updatedUser,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      // update auth headers and auth user
      console.log("Profile updated");
      console.log(response.data);
      if (response.data.jwtToken) {
        try {
          signOut();
          const jwtToken = response.data.jwtToken;
          signIn({
            auth: {
              token: jwtToken,
              tokenType: "Bearer",
            },
          });
          setAuthUser({
            username: response.data.username,
            userId: response.data.userId,
          });
        } catch (error) {
          console.error(error);
        }
      }
      setUser(updatedUser);
      showNotification("success", "Updated Successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      if (error.response) {
        showNotification("error", error.response.data);
      }
    }
  };

  return (
    <div className="bg-[#384754] shadow-md rounded-lg p-6 md:w-3/4 mt-10 m-auto w-[90%] relative">
      <div className="flex flex-col items-center justify-center">
        {notification && (
          <Notification
            content={notification.content}
            category={notification.category}
            onClose={hideNotification}
          />
        )}
        <div className="self-end mb-6">
          {isEditing ? (
            <button
              className="text-white focus:outline-none"
              onClick={handleCancelClick}
            >
              <CircleX className="h-6 w-6" />
            </button>
          ) : (
            <button
              className="text-white focus:outline-none"
              onClick={handleEditClick}
            >
              <Edit2 className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      {loading ? (
        <ProfileLoading />
      ) : (
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <img
              src={isEditing ? handleSelectedImagePreview() : getProfileImage()}
              alt={isEditing ? "Selected" : "Profile"}
              className="inline-block h-32 w-32 rounded-full object-cover"
            />
            {isEditing && (
              <label
                htmlFor="imageInput"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <div className="flex items-center text-white bg-blue-500 px-2 py-1 rounded-full shadow-md transition duration-300 hover:bg-blue-600">
                  <Image className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Change</span>
                </div>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="w-full md:w-3/4 ml-auto">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleInputChange}
                  className="w-full text-lg mb-2 p-2 pl-4 text-white bg-[#2c3a47] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="username"
                  value={editingUser.username}
                  onChange={handleInputChange}
                  className="w-full text-lg mb-2 p-2 pl-4 text-white bg-[#2c3a47] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                  className="w-full text-lg mb-4 p-2 pl-4 text-white bg-[#2c3a47] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
                <div className="flex justify-end">
                  {selectedImage && (
                    <button
                      className="bg-blue-500 text-white mr-4 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                      onClick={handleRemoveImage}
                    >
                      Clear Image
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[#2c3a47] text-center rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {user.name}
                  <span className="text-lg font-normal text-gray-300 mb-4">
                    &nbsp; @{user.username}
                  </span>
                </div>
                <p className="text-white mb-2">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-center self-center mt-8">
        {/* delete button */}
        <button
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
          onClick={openDeletePopup}
        >
          <Trash className="mr-2" />
          Delete Account
        </button>
      </div>
      <div>
        <dialog
          id="deleteDialog"
          className="bg-white p-8 rounded-lg shadow-lg relative"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={closeDeletePopup}
          >
            <X className="w-6 h-6 mb-2" />
          </button>
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to delete your account?
          </p>
          <p className="text-gray-600 mb-6">This process is irreversible.</p>
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
              onClick={handleDeleteUser}
            >
              Yes, I am sure
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
