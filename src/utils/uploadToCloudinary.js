async function uploadToCloudinary(file) {
  const CLOUDINARY_CLOUD = "demo"; // ← replace with your cloud name
const CLOUDINARY_PRESET = "unsigned_preset"; // ← replace with your unsigned preset

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUDINARY_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/auto/upload`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.secure_url;
}
export default uploadToCloudinary;