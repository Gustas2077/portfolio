import { Link, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

export function Root() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full overflow-auto">
        <Outlet />
      </div>
    </>
  );
}
