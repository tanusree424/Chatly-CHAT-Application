import { v2 as cloudinary } from 'cloudinary';
import e from 'express';
import fs from 'fs';
const uploadCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: 'diuhyysrv',
    api_key: '482215412656354',
    api_secret: '_j_AdgWg7HjpodZO8veMFSulWQA'
  });
  try {
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); // আপলোডের পর লোকাল ফাইল মুছে ফেলুন
    return result.secure_url;

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
}
export default uploadCloudinary;