import React, { useRef, useState } from 'react'
import { IoCameraOutline } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import pic from '../assets/pic.png'
import axios from 'axios'  // profile update API call এর জন্য

const Profile = () => {
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [profilePic, setProfilePic] = useState(userData?.picture || pic)
  const [Name, setName] = useState(userData?.name || '')
  const [file, setFile] = useState(null)

  const handlePicChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => setProfilePic(reader.result)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', Name)
      if (file) formData.append('profilePic', file)

      const res = await axios.put('/api/user/edit-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      alert(res.data.message)
    } catch (err) {
      console.error(err)
      alert('Profile update failed')
    }
  }

  return (
    <div className="w-full min-h-screen bg-slate-100 flex flex-col items-center p-4 pt-20 gap-6">

      {/* Back Button */}
      <div className="fixed top-4 left-4">
        <IoIosArrowRoundBack
          onClick={() => navigate(-1)}
          className="w-12 h-12 text-gray-700 cursor-pointer hover:text-gray-900 transition"
          title="Go Back"
        />
      </div>

      {/* Profile Picture */}
      <div className="relative w-52 h-52 rounded-full border-4 border-[#20c7ff] shadow-lg ">
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />

        <input
          type="file"
          accept="image/*"
          id="profilePicInput"
          className="hidden"
          onChange={handlePicChange}
        />

        <label htmlFor="profilePicInput">
          <div className='cursor-pointer overflow-hidden z-20'>
          <IoCameraOutline
            className="absolute bottom-[-1px] right-0 top-150
                       text-5xl bg-[#20c7ff] text-white border-4 border-white
                       rounded-full p-2 cursor-pointer z-20 shadow-lg
                       hover:bg-blue-600 hover:scale-110 transition duration-300 ease-in-out"
            title="Change Profile Picture"
          />
          </div>
        </label>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg flex flex-col items-center gap-6 p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700">Edit Profile</h2>

        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          placeholder="Enter Your Name"
          className="w-full h-12 px-4 border-2 text-gray-700 border-[#20c7ff] rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#20c7ff]"
          required
        />

        <input
          type="text"
          placeholder="Email"
          value={userData?.email || ''}
          readOnly
          className="w-full h-12 px-4 border-2 border-[#20c7ff] rounded-lg shadow-sm outline-none text-gray-400 focus:ring-2 focus:ring-[#20c7ff]"
        />

        <input
          type="text"
          placeholder="Username"
          value={userData?.username || ''}
          readOnly
          className="w-full h-12 px-4 border-2 border-[#20c7ff] rounded-lg shadow-sm outline-none text-gray-400 focus:ring-2 focus:ring-[#20c7ff]"
        />

        <button
          type="submit"
          className="w-full h-12 bg-[#20c7ff] text-white font-bold rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}

export default Profile
