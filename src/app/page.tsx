"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/stores/StoreProvider";
import TaskList from "@/components/TaskList";

const Home = () => {
  const { authStore } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!authStore.currentUser) {
      router.push("/login");
    }
  }, [authStore.currentUser, router]);

  if (!authStore.currentUser) return null;

  return (
    <div className="h-screen">
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Welcome to Task Manager
      </h1>
      <div className="grid place-items-center">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
