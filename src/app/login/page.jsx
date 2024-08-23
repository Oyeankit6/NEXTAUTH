"use client";
import React, { useState } from "react";
import "./style.css";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [loading, setloading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });

  const LoginDetails = {
    email: userDetails.email,
    password: userDetails.password,
  };

  const handleSignUp = async () => {
    console.log(userDetails);

    try {
      setloading(true);
      let Response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
      });
      Response = await Response.json();
      console.log(Response);
      toast.success(Response.data.message);

      setToggle(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
      setToggle(true);
    }
  };

  const handleLogin = async () => {
    console.log(LoginDetails);
    try {
      setloading(true);
      let Response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify(LoginDetails),
      });
      Response = await Response.json();
      router.push("/profile");
      toast.success(Response.data.message);
      if (!Response.data.message) {
        setloading(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="Big">
      <div className="auth-popup">
        <h1>{loading ? "loading....." : ""}</h1>
        <h1>{toggle ? "LoginPAge" : "SignupPage"}</h1>
        {toggle ? (
          ""
        ) : (
          <label htmlFor="Username">
            Username
            <input
              type="text"
              value={userDetails.username}
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
            />
          </label>
        )}
        <label htmlFor="Email">
          Email
          <input
            type="mail"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          />
        </label>
        {!toggle ? (
          <label htmlFor="Role" value={userDetails.role}>
            Role
            <select
              name=""
              id=""
              value={userDetails.role}
              onChange={(e) => {
                setUserDetails({ ...userDetails, role: e.target.value });
              }}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
        ) : (
          ""
        )}

        {toggle ? (
          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button className="auth-button" onClick={handleSignUp}>
            Signup
          </button>
        )}
        {toggle ? (
          <div className="toggle-text">
            Create A new account.
            <p onClick={() => setToggle(false)}>Click Here</p>
          </div>
        ) : (
          <div className="toggle-text">
            Already have a account.{" "}
            <p onClick={() => setToggle(true)}>Click Here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
