import { Link } from "@tanstack/react-router";
import { Home, Box, Settings, User2, Code2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="z-50 w-full flex relative justify-center items-center bg-white dark:bg-neutral-700 text-black dark:text-white">
      <ul className="max-w-sm flex max-sm:scale-75">
        <li className="">
          <Link
            to="/"
            className="relative flex justify-center items-center focus:-translate-y-6 focus:outline-none focus:ring focus:ring-red-500 ease-in-out duration-300 focus:bg-white focus:dark:bg-neutral-700 rounded-full p-2 xl:focus:translate-y-6 "
            activeProps={{className: "-translate-y-6 xl:translate-y-6 ring ring-red-500 bg-white dark:bg-neutral-700",}}
          >
            {({ isActive }) => (
              <span className="rounded-full p-2">
                <Home
                  size={40}
                  className={`p-1 transition-transform ${
                    isActive ? "scale-125" : "hover:scale-125"
                  }`}
                />
              </span>
            )}
          </Link>
        </li>
        <li className="">
          <Link
            to="/about"
            className="relative flex justify-center items-center focus:-translate-y-6 focus:outline-none focus:ring focus:ring-green-500 ease-in-out duration-300 focus:bg-white focus:dark:bg-neutral-700 rounded-full p-2 xl:focus:translate-y-6 "
            activeProps={{className: "-translate-y-6 xl:translate-y-6 ring ring-green-500 bg-white dark:bg-neutral-700",}}
          >
            {({ isActive }) => (
              <span className="rounded-full p-2">
                <User2
                  size={40}
                  className={`p-1 transition-transform ${
                    isActive ? "scale-125" : "hover:scale-125"
                  }`}
                />
              </span>
            )}
          </Link>
        </li>
        <li className="">
          <Link
            to="/blender"
            className="relative flex justify-center items-center focus:-translate-y-6 focus:outline-none focus:ring focus:ring-orange-500 ease-in-out duration-300 focus:bg-white focus:dark:bg-neutral-700 rounded-full p-2 xl:focus:translate-y-6 "
            activeProps={{className: "-translate-y-6 xl:translate-y-6 ring ring-orange-500 bg-white dark:bg-neutral-700",}}
          >
            {({ isActive }) => (
              <span className="rounded-full p-2">
                <Box
                  size={40}
                  className={`p-1 transition-transform ${
                    isActive ? "scale-125" : "hover:scale-125"
                  }`}
                />
              </span>
            )}
          </Link>
        </li>
        <li className="">
          <Link
            to="/projects"
            className="relative flex justify-center items-center focus:-translate-y-6 focus:outline-none focus:ring focus:ring-blue-500 ease-in-out duration-300 focus:bg-white focus:dark:bg-neutral-700 rounded-full p-2 xl:focus:translate-y-6 "
            activeProps={{className: "-translate-y-6 xl:translate-y-6 ring ring-blue-500 bg-white dark:bg-neutral-700",}}
          >
            {({ isActive }) => (
              <span className="rounded-full p-2">
                <Code2
                  size={40}
                  className={`p-1 transition-transform ${
                    isActive ? "scale-125" : "hover:scale-125"
                  }`}
                />
              </span>
            )}
          </Link>
        </li>
        <li className="">
          <Link
            to="/settings"
            className="relative flex justify-center items-center focus:-translate-y-6 focus:outline-none focus:ring focus:ring-purple-500 ease-in-out duration-300 focus:bg-white focus:dark:bg-neutral-700 rounded-full p-2 xl:focus:translate-y-6 "
            activeProps={{className: "-translate-y-6 xl:translate-y-6 ring ring-purple-500 bg-white dark:bg-neutral-700",}}
          >
            {({ isActive }) => (
              <span className="rounded-full p-2">
                <Settings
                  size={40}
                  className={`p-1 transition-transform ${
                    isActive ? "scale-125" : "hover:scale-125"
                  }`}
                />
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
