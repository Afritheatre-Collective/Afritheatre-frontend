"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required", {
        position: "bottom-right",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);

      toast.success("Login successful!", { position: "bottom-right" });

      // Redirect based on role
      if (data.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err instanceof Error ? err.message : "Server error", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center backdrop-blur-lg">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 my-10 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-primary"
                required
              />
            </div>

            <Button
              className="w-full text-white"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Separator className="my-4" />
          <div className="flex my-2 justify-center">
            <Button
              disabled={false}
              variant="outline"
              size="lg"
              className="w-full bg-slate-300 hover:bg-slate-400"
            >
              <FaGoogle className="size-5 mr-2" />
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Don&apos;t have an account?
            <Link
              className="text-sky-700 ml-2 hover:underline cursor-pointer"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninForm;
