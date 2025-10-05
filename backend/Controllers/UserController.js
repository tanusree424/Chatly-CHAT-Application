import uploadCloudinary from "../config/cloudinary.js";
import userModel from "../Models/Users.js";

export const getLoginUser = async (req, res) => {
  try {
    let userId = req.userId;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.userId;    
    const { name } = req.body;
    let picture;

    // File upload
    if (req.file) {
      const uploadResult = await uploadCloudinary(req.file.path);
      picture = uploadResult.url || uploadResult; // adjust depending on your uploadCloudinary return
    }

    // Fetch user
    const user = await userModel.findById(userId);  
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }   

    // Update user
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        picture: picture || user.picture
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updateUser
    });

  } catch (error) {
    console.error(error); // console এ error দেখতে সুবিধা
    return res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};

export const getAllUsersExceptLoginUser = async (req, res) => {
  try {
    const userId = req.userId;
    const users = await userModel.find({ _id: { $ne: userId } }).select("-password");

    return res.status(200).json({
      message: "Users fetched successfully",
      users: users
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error: ${error.message}`
    });
  }
};


// Search Users by username or name
export const searchUser = async(req,res)=>{
  try {
    let {query} =  req.query;
    if (!query) {
      return res.status(400).json({
        message:"No Search Value"
      });
   
    }
      let user = await userModel.find({
        $or:[
          {
            name: {$regex:query , $options:"i"},

          },
          {
            userName: {$regex:query , $options:"i"}
          }
        ]
        
      });
      return res.status(200).json({
        userData:user
      });
  } catch (error) {
    console.log(error)
    res.status(500).json(`errror searching due to ${error}`)
  }
}