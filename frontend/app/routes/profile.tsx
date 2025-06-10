import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";

// app/routes/profile.tsx
export default function Profile() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Guardar el token si viene desde la URL
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      localStorage.setItem("auth_token", tokenFromUrl);
      setToken(tokenFromUrl);
      window.history.replaceState({}, "", "/profile");
    } else {
      // Si no viene en la URL, obtenerlo desde localStorage
      const storedToken = localStorage.getItem("auth_token");
      setToken(storedToken);
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>
        <p className="text-gray-700 text-base">This is your profile page.</p>
      </div>
    </div>
  );
}