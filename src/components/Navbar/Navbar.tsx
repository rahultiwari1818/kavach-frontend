"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import Overlay from "../Overlay/Overlay";

export default function Navbar({ role }: { role: string | undefined }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(role," ROle FE")

  const logoutHandler = async () => {
    try {
      setIsLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response) toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Overlay open={isLoading} />

      <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-blue-600">Kavach</span>
          </Link>

          {/* Desktop Menu */}
          {role && (
            <div className="hidden md:flex items-center gap-6">
              {role === "super-admin" && (
                <>
                  <Link href="/super-admin/home" className="nav-link">Home</Link>
                  <Link href="/super-admin/manage-admins" className="nav-link">Manage Admins</Link>
                  <Link href="/super-admin/manage-users" className="nav-link">Manage Users</Link>
                  <Link href="/super-admin/audit-log" className="nav-link">View Logs</Link>
                  <Link href="/super-admin/verified-crime" className="nav-link">Verified Crimes</Link>
                </>
              )}

              {role === "admin" && (
                <>
                  <Link href="/admin/home" className="nav-link">Home</Link>
                  <Link href="/admin/manage-users" className="nav-link">Manage Users</Link>
                  <Link href="/admin/verified-crime" className="nav-link">Verified Crimes</Link>
                </>
              )}

              {role === "public" && (
                <>
                  <Link href="/public/home" className="nav-link">Home</Link>
                  <Link href="/public/crime-report" className="nav-link">Report Crime</Link>
                  <Link href="/public/my-reported-crimes" className="nav-link">View Reported Crimes</Link>
                </>
              )}

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              className="text-2xl focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {role && isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 px-4">
            {role === "super-admin" && (
              <>
                <Link href="/super-admin/home" className="nav-link">Home</Link>
                <Link href="/super-admin/manage-admins" className="nav-link">Manage Admins</Link>
                <Link href="/super-admin/manage-users" className="nav-link">Manage Users</Link>
                <Link href="/super-admin/audit-log" className="nav-link">View Logs</Link>
                <Link href="/super-admin/verified-crime" className="nav-link">Verified Crimes</Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link href="/admin/home" className="nav-link">Home</Link>
                <Link href="/admin/manage-users" className="nav-link">Manage Users</Link>
                <Link href="/admin/verified-crime" className="nav-link">Verified Crimes</Link>
              </>
            )}

            {role === "public" && (
              <>
                <Link href="/public/home" className="nav-link">Home</Link>
                <Link href="/public/crime-report" className="nav-link">Report Crime</Link>
                <Link href="/public/my-reported-crimes" className="nav-link">View Reported Crimes</Link>
              </>
            )}

            <button
              onClick={logoutHandler}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
