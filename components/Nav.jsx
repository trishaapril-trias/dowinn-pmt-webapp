"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getLoggedIn, logout } from "@context/auth";
import { useAuth } from "@hooks/useAuth";
import { redirect } from "@node_modules/next/navigation";

// import { signIn, signOut, useSession, getProviders } from "@node_modules/next-auth/react";



const Nav = () => {
  // const isUserLoggedIn = false;
   const isUserLoggedIn =  useAuth()
  const [toggleDropdown, setToggleDropdown] = useState(false);

  

  useEffect(() => {
    
  }, []);

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
        <p className="orange_gradient font-semibold ">Project Management WebApp</p>
      </Link>
      <button type="button" className="black_btn" onClick={async() =>{ await logout(); redirect("/")}}>
        Logout
      </button>

      {/* Desktop Navigation*/}
      {/* <div className=" sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
                <button
                  type="button"
                  onClick={() => {
          
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
          </>
        )}
      </div> */}

      {/* Mobile Navigation*/}
      <div className=" sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link 
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                href="/create-promp"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                type="button"
                className="mt-5 w-full black_btn"
                onClick={() => {
                  setToggleDropdown(false);
                }}>

                </button>
              </div>
            )}
          </div>
        ) : (
          <>
                <button
                  type="button"
                  className="black_btn"
                >
                  Sign in
                </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
