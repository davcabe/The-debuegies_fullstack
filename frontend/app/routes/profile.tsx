import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";

// app/routes/profile.tsx
export default function Profile() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
 
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      window.history.replaceState({}, "", "/profile");
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