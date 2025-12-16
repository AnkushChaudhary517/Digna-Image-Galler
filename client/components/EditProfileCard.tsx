import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { profileAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface EditProfileCardProps {
  onUpdateClick?: (data: any) => void;
  onCancelClick?: () => void;
}

export default function EditProfileCard({
  onUpdateClick,
  onCancelClick,
}: EditProfileCardProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    instagram: "",
    twitter: "",
    youtube: "",
    pinterest: "",
    bio: "",
    password: "",
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response:any = await profileAPI.getProfile();
      if (response.success) {
        const profile = response.data;
        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          website: profile.website || "",
          instagram: profile.socialLinks?.instagram || "",
          twitter: profile.socialLinks?.twitter || "",
          youtube: profile.socialLinks?.youtube || "",
          pinterest: profile.socialLinks?.pinterest || "",
          bio: profile.bio || "",
          password: "",
          newsletter: profile.newsletter || false,
        });
        setProfileImage(profile.profileImage || "");
      } else {
        setError(response.error?.message || "Failed to load profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setError(null);
        setSuccessMessage(null);
        setIsUploading(true);
        const response = await profileAPI.uploadProfilePicture(file);
        if (response.success) {
          setProfileImage(response.data.profileImage);
          setSuccessMessage("Profile picture uploaded successfully");
        } else {
          setError(response.error?.message || "Upload failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      setIsSaving(true);
      const response : any = await profileAPI.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        website: formData.website,
        bio: formData.bio,
        socialLinks: {
          instagram: formData.instagram,
          twitter: formData.twitter,
          youtube: formData.youtube,
          pinterest: formData.pinterest,
        },
        newsletter: formData.newsletter,
      });
      setSuccessMessage("Profile updated successfully");
      navigate("/profile");
      if (response.success) {
        setSuccessMessage("Profile updated successfully");
        if (onUpdateClick) {
          onUpdateClick(response.data);
        }
      } else {
        setError(response.error?.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 8.4v7.2c0 3.8-2.6 6.4-6.4 6.4H7.8C4.4 22 2 19.4 2 15.6V8.4C2 4.6 4.4 2 7.8 2z" />
              </svg>
            </div>
          </div>
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading || isSaving}
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
              disabled={isUploading || isSaving}
            >
              {isUploading ? "Uploading..." : "Choose File"}
            </button>
          </label>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
                Instagram
              </div>
            </label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 002.856-9.926c-1.885.827-3.9 1.426-6.014 1.74-.857-.818-2.081-1.328-3.429-1.328-2.59 0-4.693 2.104-4.693 4.694 0 .368.043.727.127 1.074-3.901-.195-7.358-2.064-9.671-4.906-.405.694-.635 1.5-.635 2.361 0 1.628.83 3.06 2.088 3.901-.771-.025-1.496-.237-2.13-.586v.06c0 2.281 1.622 4.182 3.773 4.614-.395.108-.811.168-1.239.168-.302 0-.6-.028-.887-.082.602 1.88 2.343 3.25 4.405 3.288-1.61 1.263-3.638 2.016-5.847 2.016-.38 0-.749-.022-1.112-.066 2.179 1.397 4.768 2.212 7.548 2.212 9.056 0 13.999-7.496 13.999-13.986 0-.209-.005-.418-.015-.627.961-.695 1.796-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </div>
            </label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </div>
            </label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>

          {/* Pinterest */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.937-.2-2.378.042-3.41.217-.937 1.402-5.938 1.402-5.938s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.768 1.518 1.688 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.744-2.438-3.084-2.438-4.96 0-3.762 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.213 7.431-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
                Pinterest
              </div>
            </label>
            <input
              type="url"
              name="pinterest"
              value={formData.pinterest}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Put your bio here
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Describe your bio"
            disabled={isSaving}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none disabled:opacity-50"
          />
        </div>

        {/* Newsletter Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newsletter: e.target.checked,
              }))
            }
            disabled={isSaving}
            className="w-5 h-5 border border-gray-300 rounded accent-blue-600 disabled:opacity-50"
          />
          <span className="text-sm font-semibold text-gray-900">
            Subscribe to the newsletter.
          </span>
        </label>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Updating..." : "Update Profile"}
          </button>
          <button
            type="button"
            onClick={onCancelClick}
            disabled={isSaving || isUploading}
            className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
