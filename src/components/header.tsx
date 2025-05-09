"use client";

import { useStore } from "@/stores/StoreProvider";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

const Header = observer(() => {
  const { authStore } = useStore();
  const router = useRouter();

  const handleLogout = () => {
    authStore.logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">Task Manager</Link>
      </h1>

      <nav className="space-x-4">
        {authStore.currentUser ? (
          <>
            <span className="text-gray-700">
              Logged in as: <strong>{authStore.currentUser}</strong>
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
});

export default Header;
