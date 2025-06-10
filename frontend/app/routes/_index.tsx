// app/routes/_index.tsx
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  return redirect("/register");
};

export default function Index() {
  return null;
}
