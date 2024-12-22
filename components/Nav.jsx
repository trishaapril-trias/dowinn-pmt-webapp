"use client";

import Link from "next/link";
import Image from "next/image";
import { logout } from "@context/auth";
import { useRouter } from "@node_modules/next/navigation";
import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Perform the logout action
      setIsLoggedIn(false); // Immediately update the state
      router.push("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
   console.log(isLoggedIn)
  }, [])
  

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/login" className="flex gap-2 flex-center py-5">
        <Image
          src="/assets/images/logo_pmt.png"
          alt="PMT Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="orange_gradient font-semibold">Project Management WebApp</p>
      </Link>
      {isLoggedIn && (
        <button type="button" className="black_btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
