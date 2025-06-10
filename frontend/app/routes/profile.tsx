// app/routes/profile.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";

const getRandomAvatar = () => {
  const randomId = Math.floor(Math.random() * 70) + 1; // Increased range for more variety
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${randomId}`;
};

export default function Profile() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    displayName: "Cargando...",
    pronouns: "Prefiero no decir",
    interests: "Cargando...",
    location: "Planeta Tierra",
    bio: "Cargando...",
    avatarUrl: getRandomAvatar(),
    themeColor: "bg-indigo-500",
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    if (token) {
      localStorage.setItem("auth_token", token);
    }

    if (emailFromUrl) {
      localStorage.setItem("auth_email", emailFromUrl);
      setEmail(emailFromUrl);
    } else {
      const storedEmail = localStorage.getItem("auth_email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
    window.history.replaceState({}, "", "/profile");
    setTimeout(() => {
      setProfileData((prev) => ({
        ...prev,
        displayName: "Cosmic Wanderer",
        pronouns: "Elle/Le",
        interests: "Exploración, Arte, Música",
        location: "En algún lugar del universo",
        bio: "Buscando la belleza en cada rincón del cosmos.",
        avatarUrl: getRandomAvatar(),
      }));
    }, 750);
  }, [searchParams]);

  const themeColors = [
    "bg-indigo-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
  ];

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="max-w-4xl mx-auto w-full shadow-xl rounded-2xl overflow-hidden">
        <div className="md:flex">
          <div
            className={`w-full md:w-1/3 p-8 flex flex-col items-center justify-center text-white ${profileData.themeColor}`}
          >
            <img
              src={profileData.avatarUrl}
              alt="Avatar"
              className="rounded-full w-32 h-32 shadow-md border-4 border-white"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {profileData.displayName}
            </h2>
            <p className="text-sm mt-1 italic">{profileData.pronouns}</p>
            {email && <p className="text-sm mt-1">{email}</p>}
            <p className="text-center mt-3">{profileData.bio}</p>
          </div>
          <div className="w-full md:w-2/3 p-8 bg-white">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Perfil de Usuario
            </h2>

            <div className="mb-4">
              <strong className="block font-medium text-gray-700">
                Intereses:
              </strong>
              <p className="text-gray-600">{profileData.interests}</p>
            </div>

            <div className="mb-4">
              <strong className="block font-medium text-gray-700">
                Ubicación:
              </strong>
              <p className="text-gray-600">{profileData.location}</p>
            </div>

            <div className="mb-6">
              <strong className="block font-medium text-gray-700">
                Email:
              </strong>
              <p className="text-gray-600">{email || "No especificado"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
