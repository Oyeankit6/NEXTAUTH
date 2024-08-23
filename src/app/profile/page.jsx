"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const handleLogOut = async () => {
    let res = await fetch("http://localhost:3000/api/users/logout");
    router.push("/login");
  };
  return (
    <div>
      <h1>WELCOME TO HOME PAGE</h1>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};

export default page;
