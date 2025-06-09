// app/routes/register.tsx
import { redirect, json, type ActionFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { useState } from "react";

 function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json({ errors: { email: !email ? "Email is required" : null, password: !password ? "Password is required" : null } }, { status: 400 });
  }

  // Aquí se hará la llamada real a la API para registrar (ejemplo comentado)
  // const response = await fetch("https://api.example.com/register", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password })
  // });

  return redirect("/login");
};

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Form method="post">
          <InputField label="Email" name="email" value={email} onChange={setEmail} error={actionData?.errors?.email} />
          <InputField label="Password" name="password" type="password" value={password} onChange={setPassword} error={actionData?.errors?.password} />

          <div className="flex items-center justify-between">
            <button type="submit" disabled={navigation.state === "submitting"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {navigation.state === "submitting" ? "Registering..." : "Register"}
            </button>
            <Link to="/login" className="text-sm text-blue-500 hover:text-blue-800 font-bold">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

