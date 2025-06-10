import { Form, useActionData, useNavigation, Link, json, redirect } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { useState } from "react";
import { loginUser } from "~/services/userService";


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
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : ""
          }`}
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
      return json({
        errors: {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
        }
      }, { status: 400 });
    }
  
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        return redirect(`/profile?token=${data.token}&email=${encodeURIComponent(data.email)}`); 
      } else {
        return json({ errors: { general: "Invalid credentials" } }, { status: 401 });
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      return json({ errors: { general: "An error occurred during login" } }, { status: 500 });
    }
  };
  export default function Login() {
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isSubmitting = navigation.state === "submitting";
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {actionData?.errors?.general && (
            <p className="text-red-500 text-xs italic mb-4 text-center">
              {actionData.errors.general}
            </p>
          )}
          <Form method="post">
            <InputField
              label="Email"
              name="email"
              value={email}
              onChange={setEmail}
              error={actionData?.errors?.email}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              error={actionData?.errors?.password}
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:text-blue-800 font-bold"
              >
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }