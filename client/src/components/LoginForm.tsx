import { BASE_BE_URL, BASE_FE_URL } from "@/c";
import { redirect } from "next/navigation";
import Dialog from "./Dialog";
import { cookies } from "next/headers";
import Link from "next/link";

const LoginForm = () => {
  const onLoginFormSubmit = async (formData: FormData) => {
    "use server";
    // get mail
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // POST
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    const res = await fetch(`${BASE_BE_URL}/login`, requestOptions);
    const resJson = await res.json();
    if (!res.ok) {
      const msg = resJson.error ?? "LoginForm component POST user login error";
      console.log(msg);
      // kick here + err msg
      return redirect(`${BASE_FE_URL}/login?error=${msg}`);
    } else {
      console.log("LoginForm component POST user login ok", resJson);
      const { msg, token, user } = resJson;
      const { book, email, status } = user;
      // save token to cookie
      cookies().set("token", token, {
        httpOnly: true,
        secure: false,
        // expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sameSite: "strict",
      });
      // save status to cookie
      cookies().set("status", status, {
        httpOnly: true,
        secure: false,
        // expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
        sameSite: "strict",
      });
      // kick dashboard
      if (status === "Admin") {
        return redirect(`/admin-dashboard`);
      } else {
        return redirect(`/dashboard`);
      }
    }
  };
  return (
    <div className="flex flex-col w-full">
      {/* error? show */}
      <Dialog />
      {/* card */}
      <div className="w-full max-w-xl m-auto p-8 shadow-md bg-white rounded">
        {/* title */}
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Login</h1>
        <form action={onLoginFormSubmit}>
          {/* email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email@mail.com"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Must be correct email domain format: test@mail.com.
            </p>
          </div>
          {/* password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="password"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Minimum 8 character, alphanumeric, minimum 1 capital letter, and
              no special characters allowed.
            </p>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mt-auto w-fit"
          >
            Login
          </button>
          <p className="mt-2 text-sm text-gray-500">
            No account?{" "}
            <Link
              className="font-medium text-orange-600 hover:underline"
              href={"/register"}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
