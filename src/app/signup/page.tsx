"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/StoreProvider";

const SignupPage = () => {
  const { authStore } = useStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      authStore.signup(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 h-[50vh] w-[500px] bg-slate-400 shadow-2xl rounded-md">
      <h2 className="text-xl font-bold text-center mb-4 p-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col m-10 gap-4">
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
        {error && <p className="text-red-500 justify-end">{error}</p>}
        <button type="submit" className="bg-green-500  text-white w-36 px-4 py-2 rounded-lg">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
