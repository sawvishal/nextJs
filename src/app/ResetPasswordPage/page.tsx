"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      setMessage("Password successfully reset.");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      console.log(error);
      setMessage(error.response?.data?.message || "Reset failed.");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <h1 className="text-3xl font-bold">Reset Password</h1>
      {message && <p className="text-red-500">{message}</p>}

      <input
        type="password"
        placeholder="New Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="border p-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleReset}
      >
        Reset Password
      </button>
    </div>
  );
}
