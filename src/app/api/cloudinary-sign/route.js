"use server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // server-side only
  secure: true,
});

export async function POST(req) {
  try {
    const { paramsToSign } = await req.json();
    const signature = cloudinary.v2.utils.api_sign_request(
      {
        timestamp: paramsToSign.timestamp,
        folder: paramsToSign.folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return Response.json({ success: true, signature, timestamp: paramsToSign.timestamp });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
