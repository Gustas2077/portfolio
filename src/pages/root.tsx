import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

export function Root() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full overflow-auto">
        <Outlet />

        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <a href="#" className="flex items-center mb-4 sm:mb-0">
                <svg
                  className="h-8 mr-3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  ></path>
                </svg>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Gus.
                </span>
              </a>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="#" className="hover:underline">
                Gustas Germanas™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
