import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";

export default function Profile() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);

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
  }, [searchParams]);


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
        <h2 className="text-2xl font-bold mb-6">
          {email ? `Bienvenid@, ${email}` : "Bienvenid@ a tu perfil"}
        </h2>
        <p className="text-gray-700 text-base">Este es tu perfil.</p>
      </div>
    </div>
  );
}