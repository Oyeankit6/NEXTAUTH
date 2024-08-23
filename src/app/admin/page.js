"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const handlelogout = async () => {
    let res = await fetch("/api/users/logout");
    router.push("/login");
  };

  return (
    <div>
      <h>HELLO ADMIN PAGE HERE</h>
      <button onClick={handlelogout}>Log out</button>
    </div>
  );
};

export default Admin;
