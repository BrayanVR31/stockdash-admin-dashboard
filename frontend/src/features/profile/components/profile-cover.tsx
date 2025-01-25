import { Camera } from "lucide-react";
import { UserImage } from "./user-image";

function ProfileCover() {
  const backgroundImage =
    "https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-72 bg-red-500 relative">
      <img
        className="min-w-full h-full object-cover object-left-top brightness-50 saturate-200"
        src={backgroundImage}
        alt="profile wallpaper"
      />
      <UserImage />
      <h4 className="absolute bottom-10 text-white left-80 text-4xl">
        Panchito Juaréz
      </h4>
      <button className="absolute bottom-10 right-20 bg-blue-800 px-5 py-3 rounded-full text-sm text-white font-sans font-normal hover:bg-blue-700 transition-colors duration-700 shadow-md flex items-center gap-x-2">
        <Camera size={20} />
        <span>Editar portada</span>
      </button>
    </div>
  );
}

export { ProfileCover };
