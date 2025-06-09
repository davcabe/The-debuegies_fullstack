// app/routes/register.tsx
import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email) {
    return { errors: { email: "Email is required" } };
  }

  if (!password) {
    return { errors: { password: "Password is required" } };
  }

  // Simulate successful registration
  return redirect("/profile");
};

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>
        <Form method="post">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                actionData?.errors?.email ? "border-red-500" : ""
              }`}
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {actionData?.errors?.email && (
              <p className="text-red-500 text-xs italic">{actionData.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                actionData?.errors?.password ? "border-red-500" : ""
              }`}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {actionData?.errors?.password && (
              <p className="text-red-500 text-xs italic">{actionData.errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}