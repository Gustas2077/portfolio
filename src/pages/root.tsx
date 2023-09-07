import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

export function Root() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full overflow-auto">
        <Outlet />
        <footer className="h-52 bg-slate-500 mt-2">Footer</footer>
      </div>
    </>
  );
}
