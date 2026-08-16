import { LogOut, BellOff, BellIcon, Loader2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useRef, useState } from "react";
// تأكد من صحة مسارات الاستدعاء التالية بناءً على هيكل مشروعك
import ImageCropper from "./ImageCropper";
import getCroppedImg from "../utils/cropUtils";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { authUser, logout, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState();
  const [imageToCrop, setImageToCrop] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageToCrop(reader.result);
      e.target.value = "";
    };
  };

  const onCropDone = async (croppedAreaPixels) => {
    try {
      const croppedBase64 = await getCroppedImg(imageToCrop, croppedAreaPixels);

      setSelectedImg(croppedBase64);
      setImageToCrop(null);

      await updateProfile({ profilePic: croppedBase64 });
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const onCropCancel = () => {
    setImageToCrop(null);
  };

  return (
    <>
      <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden border-2 border-slate-600/50">
              <button
                type="button"
                className={`relative group w-full h-full block ${
                  isUpdatingProfile ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() =>
                  !isUpdatingProfile && fileInputRef.current.click()
                }
                disabled={isUpdatingProfile}
              >
                <img
                  src={selectedImg || authUser?.profilePic || "avatar.png"}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                {!isUpdatingProfile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-[10px] font-semibold">
                      Change
                    </span>
                  </div>
                )}
                {isUpdatingProfile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUpdatingProfile}
              />
            </div>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1e2638] rounded-full z-10"></span>
          </div>
          <div>
            <h2 className="text-slate-100 font-semibold text-[15px]">
              {authUser?.fullName}
            </h2>
            <span className="text-slate-400 text-xs font-medium">Online</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={logout}
            className="p-2 hover:bg-slate-700/50 hover:text-slate-200 rounded-lg transition-all"
          >
            <LogOut size={18} />
          </button>

          <button
            className="p-2 hover:bg-slate-700/50 hover:text-slate-200 rounded-lg transition-all"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? <BellIcon size={18} /> : <BellOff size={18} />}
          </button>
        </div>
      </div>

      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          onCropDone={onCropDone}
          onCancel={onCropCancel}
        />
      )}
    </>
  );
};

export default ProfileHeader;
