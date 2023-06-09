import { Cloudinary } from "@cloudinary/url-gen";

// Create a new Cloudinary instance with your account details
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "",
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY || "",
    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET || "",
  },
  url: {
    secure: true,
  },
});

// Export the Cloudinary instance to be used in other parts of your app
export default cloudinary;
