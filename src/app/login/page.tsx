"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/StoreProvider";

const LoginPage = () => {
  const { authStore } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      authStore.login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 h-[50vh] w-[500px] bg-slate-400 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center p-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col m-10 gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 w-36 rounded-lg text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
