import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import productHeaderSvgs from "@/components/decorativeSvgs/productHeaderSvgs";
import { useAuth } from "@/context/AuthContext";
import { UploadIcon } from "lucide-react";
import { userProfileAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdatePage() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    website: "",
    instagram: "",
    twitter: "",
    youtube: "",
    pinterest: "",
    bio: "",
    password: "",
    newsletter: true,
  });
   useEffect(() => {
    async function fetchProfile() {
      try {
        const res: any = await userProfileAPI.getProfile();
        if (res.success && res.data) {
          setFormData({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            bio: res.data.bio || "",
            email: res.data.email || "",
            twitter: res.data.twitter || "",
            pinterest : res.data.pinterest || "",
            instagram: res.data.instagram || "",
            youtube: res.data.youtube || "",
            website: res.data.website || "",
            password: "",
            newsletter: res.data.newsletter || false,
          });
          setPreviewUrl(res.data.profileImage || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  

  const [uploading, setUploading] = useState(false);

  // 🔹 New state for profile image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.profileImage ||
      "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
  );

  const openFilePicker = () => inputRef.current?.click();

  // 🔹 Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // show preview
    }
  };
const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // 🔹 Build multipart/form-data to include image + text fields
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, String(value));
      });

      if (selectedImage) {
        form.append("profileImage", selectedImage);
      }
    const response = await userProfileAPI.updateProfile(form);
    toast.success("✅ Profile updated successfully!");
    navigate("/profile");
      if (!response.ok) throw new Error("Update failed");
      const data = await response.json();

      if (data.success) {
        toast.success("✅ Profile updated successfully!");
      } else {
        toast.error("❌ Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      //toast.error("⚠️ Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header
        decorativeSvg={productHeaderSvgs}
        heading=" "
        description=" "
        height="300px"
      />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
        <form
          style={{ top: "-90px", position: "relative" }}
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-4xl space-y-6"
        >
          {/* 🔹 Profile Image Section */}
          <div
  className="flex items-center justify-between w-full max-w-md p-4 rounded-lg border-2 border-primary"
>
  {/* Profile Image */}
  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary flex-shrink-0" >
    <img
      src={previewUrl}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    ref={inputRef}
    onChange={handleImageSelect}
    className="hidden"
  />

  {/* Browse Button */}
  <Button
    type="button"
    onClick={openFilePicker}
    className="ml-6"
    style={{
      backgroundColor: "#2B21DA",
      color: "white",
      height: "43px",
      width: "138px",
      fontSize: "12px",
    }}
  >
    <UploadIcon size={14} className="mr-1" />
    Browse
  </Button>
</div>


          {/* 🔹 Text Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="instagram"
              placeholder="Instagram"
              value={formData.instagram}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="twitter"
              placeholder="Twitter"
              value={formData.twitter}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="youtube"
              placeholder="YouTube"
              value={formData.youtube}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
            <Input
              name="pinterest"
              placeholder="Pinterest"
              value={formData.pinterest}
              onChange={handleChange}
              style={{backgroundColor:"#F5F5F5",color:"black"}}
            />
          </div>

          <Textarea
            name="bio"
            placeholder="Describe your bio"
            value={formData.bio}
            onChange={handleChange}
            className="min-h-[120px]"
            style={{backgroundColor:"#F5F5F5",color:"black"}}
          />

          <Input
            type="password"
            name="password"
            placeholder="Change your Password"
            value={formData.password}
            onChange={handleChange}
            style={{backgroundColor:"#F5F5F5",color:"black"}}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              name="newsletter"
              style={{backgroundColor:"#2B21DA"}}
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, newsletter: !!checked }))
              }
            />
            <span className="text-sm text-gray-700">
              Subscribe to the newsletter.
            </span>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              type="submit"
              disabled={uploading}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2"
            >
              {uploading ? "Updating..." : "Update Profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2"
              onClick={() => (window.location.href = "/profile")}
            >
              Cancel
            </Button>
          </div>
        </form>
        
      </div>
      <Footer></Footer>
    </>
  );
}
