import { BASE_BE_URL, BASE_FE_URL } from "@/c";
import Dialog from "@/components/Dialog";
import { verifyJose } from "@/helper";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  // GET books
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  const res = await fetch(`${BASE_BE_URL}/books`, { cache: "no-store" });
  const resJson = await res.json();
  if (!res.ok) {
    const msg = resJson.error ?? "Dashboard component GET books error";
    console.log(msg);
    // kick here + err msg
    return redirect(`${BASE_FE_URL}/dashboard?error=${msg}`);
  } else {
    console.log("Dashboard component GET books ok", resJson);
  }
  const { books } = resJson;
  type book = {
    _id: string;
    author: string;
    image: string;
    status: string;
    title: string;
  };
  return (
    <main className="flex-1 bg-gray-100 flex p-4">
      <div className="container mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">
          Dashboard - Regular
        </h1>
        {/* logout */}
        <form
          action={async () => {
            "use server";
            cookies().get("token") && cookies().delete("token");
            cookies().get("status") && cookies().delete("status");
            redirect("/login");
          }}
        >
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mt-auto w-fit">
            Logout
          </button>
        </form>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        {/* error? show */}
        <Dialog />
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map(({ image, title, author, status }: book) => (
            <div
              className="bg-white rounded-md shadow-md overflow-hidden flex flex-col"
              key={image}
            >
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="w-full h-auto max-h-80 border-b-2 object-cover"
                priority
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl leading-tight font-medium text-black mb-2">
                  {title}
                </h3>
                <p className="text-gray-500 mb-4">Author: {author}</p>
                <p
                  className={`uppercase tracking-wide text-sm font-semibold mb-4 ${
                    status === "borrowed" ? "text-rose-500" : "text-indigo-500"
                  }`}
                >
                  {status}
                </p>
                <div className="flex gap-2">
                  <form
                    action={async () => {
                      "use server";
                      // get cookie
                      const cookie = cookies().get("token");
                      // no cookie? kick login
                      if (!cookie) {
                        redirect("/login");
                      }
                      // cookie -> token
                      const token = cookie.value;
                      // token -> payload (email)
                      const payload = await verifyJose<{ email: string }>(
                        token
                      );
                      const { email } = payload;
                      // GET find user by email
                      let myHeaders = new Headers();
                      myHeaders.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                      );
                      myHeaders.append("Authorization", `Bearer ${token}`);
                      let userRequestOptions = {
                        method: "GET",
                        headers: myHeaders,
                      };
                      const userRes = await fetch(
                        `${BASE_BE_URL}/user/${email}`,
                        userRequestOptions
                      );
                      const userResJson = await userRes.json();
                      const { user } = userResJson;
                      const { book } = user;
                      // already borrowed? return
                      if (book !== "") {
                        return redirect(
                          `${BASE_FE_URL}/dashboard?error=${`Please return ${book} before borrowing again`}`
                        );
                      }
                      // PATCH
                      let requestOptions = {
                        method: "PATCH",
                        headers: myHeaders,
                      };
                      const res = await fetch(
                        `${BASE_BE_URL}/borrow/${title}`,
                        requestOptions
                      );
                      const resJson = await res.json();
                      if (!res.ok) {
                        const msg =
                          resJson.error ?? "Dashboard page PATCH borrow error";
                        console.log(msg);
                        // kick here + err msg
                        return redirect(
                          `${BASE_FE_URL}/dashboard?error=${msg}`
                        );
                      } else {
                        console.log("Dashboard page PATCH borrow ok", resJson);
                        return redirect(
                          `${BASE_FE_URL}/dashboard?ok=${`${title} Successfully Borrowed`}`
                        );
                      }
                    }}
                  >
                    <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mt-auto w-fit">
                      Borrow
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      // get cookie
                      const cookie = cookies().get("token");
                      // no cookie? kick login
                      if (!cookie) {
                        redirect("/login");
                      }
                      // cookie -> token
                      const token = cookie.value;
                      // token -> payload (email)
                      const payload = await verifyJose<{ email: string }>(
                        token
                      );
                      const { email } = payload;
                      // GET find user by email
                      let myHeaders = new Headers();
                      myHeaders.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded"
                      );
                      myHeaders.append("Authorization", `Bearer ${token}`);
                      let userRequestOptions = {
                        method: "GET",
                        headers: myHeaders,
                      };
                      const userRes = await fetch(
                        `${BASE_BE_URL}/user/${email}`,
                        userRequestOptions
                      );
                      const userResJson = await userRes.json();
                      const { user } = userResJson;
                      const { book } = user;
                      // already returned? return
                      if (book === "") {
                        return redirect(
                          `${BASE_FE_URL}/dashboard?error=${`You have not borrowed ${title} yet`}`
                        );
                      }
                      // PATCH
                      let requestOptions = {
                        method: "PATCH",
                        headers: myHeaders,
                      };
                      const res = await fetch(
                        `${BASE_BE_URL}/returnBook/${title}`,
                        requestOptions
                      );
                      const resJson = await res.json();
                      if (!res.ok) {
                        const msg =
                          resJson.error ??
                          "Dashboard page PATCH returnBook error";
                        console.log(msg);
                        // kick here + err msg
                        return redirect(
                          `${BASE_FE_URL}/dashboard?error=${msg}`
                        );
                      } else {
                        console.log(
                          "Dashboard page PATCH returnBook ok",
                          resJson
                        );
                        return redirect(
                          `${BASE_FE_URL}/dashboard?ok=${`${title} Successfully Returned`}`
                        );
                      }
                    }}
                  >
                    <button className="bg-white text-orange-500 border border-orange-500 px-4 py-2 rounded hover:bg-orange-100 mt-auto w-fit">
                      Return
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
