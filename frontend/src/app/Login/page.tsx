"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data[0]?.role === "admin") {
        localStorage.setItem("token", data[0].id);
        router.push("/admin");
      } else {
        localStorage.setItem("token", data[0]?.id);
        router.push("/");
      }
    } catch (err) {
      console.error("Fetch алдаа:", err);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[300px] h-[350px] border flex justify-center items-center flex-col gap-3 mt-40 rounded-xl p-4">
        <h1 className="font-bold text-xl">Нэвтрэх</h1>
        <Input
          className="rounded-xl"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="rounded-xl"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="font-bold hover:bg-white bg-blue-500 rounded-xl"
          onClick={handleLogin}
        >
          Нэвтрэх
        </Button>
        <Link href="/register">
          <p className="text-gray-600 text-sm">Бүртгүүлэх</p>
        </Link>
      </div>
    </div>
  );
};
export default Login;
