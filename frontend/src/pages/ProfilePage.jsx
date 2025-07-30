import { Camera } from "lucide-react";
import useZustandStore from "../hook/useZustandStore";
import toast from "react-hot-toast";
import { useState } from "react";

const ProfilePage = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useZustandStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profileImage: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-background-card space-y-8 p-6 rounded-xl">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* avtar section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profileImage || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-1.5">
            <h1 className="text-center font-semibold text-xl bg-background/25 p-2">
              {authUser?.name}
            </h1>
            <p className="text-center bg-background/25 p-2">
              {authUser?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
