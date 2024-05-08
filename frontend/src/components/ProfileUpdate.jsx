import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '../redux/actions/authActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileUpdate = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: authState.user.name,
    email: authState.user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateProfileRequest(formData));
      toast.success('Profile updated successfully!');
    } catch (error) {
     
      console.error('Error updating profile:', error);
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Profile Settings</h1>

        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save Changes
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ProfileUpdate;
