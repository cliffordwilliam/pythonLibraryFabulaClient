"use client";

import { BASE_BE_URL, BASE_FE_URL } from "@/c";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Spinner from "./Spinner";
import Dialog from "./Dialog";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onRegisterFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
    const res = await fetch(`${BASE_BE_URL}/register`, requestOptions);
    const resJson = await res.json();
    setLoading(false);
    // const resJson = await res.json();
    if (!res.ok) {
      const msg = resJson.error ?? "RegisterForm component POST user error!";
      // kick here + err msg
      return router.push(`${BASE_FE_URL}/register?error=${msg}`);
    } else {
      console.log("RegisterForm component POST user ok", resJson);
      return router.push(
        `${BASE_FE_URL}/login?ok=${"Registration Successful"}`
      );
    }
  };
  return (
    <>
      {loading ? (
        <>
          {/* loader */}
          <Spinner />
        </>
      ) : (
        <>
          <div className="flex flex-col w-full">
            {/* error? show */}
            <Dialog />
            {/* card */}
            <div className="w-full max-w-xl m-auto p-8 shadow-md bg-white rounded">
              {/* title */}
              <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
                Register
              </h1>
              <form onSubmit={onRegisterFormSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 8 character, alphanumeric, minimum 1 capital letter,
                    and no special characters allowed.
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mt-auto w-fit"
                >
                  Register
                </button>
                <p className="mt-2 text-sm text-gray-500">
                  Got account?{" "}
                  <Link
                    className="font-medium text-orange-600 hover:underline"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterForm;
