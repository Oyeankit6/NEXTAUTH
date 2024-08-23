"use client";

import React from "react";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();
  const handleLogOut = async () => {
    let res = await fetch("/api/users/logout", {
      method: "GET",
    });

    router.push("/login");
  };
  return (
    <div>
      <h1>WELCOME TO HOME PAGE</h1>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}

export default Page;
