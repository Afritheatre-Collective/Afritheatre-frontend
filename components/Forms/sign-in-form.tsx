"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="h-full flex items-center justify-center backdrop-blur-lg px-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 my-10 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl">
            Login
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-center text-accent-foreground">
            Use email or service to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm md:text-base">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-none border-x-0 border-t-0 border-b-2 pl-4 pr-10 py-5 text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                  required
                />
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm md:text-base">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-none border-x-0 border-t-0 border-b-2 pl-4 pr-10 py-5 text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {showPassword ? (
                    <FaEyeSlash
                      className="text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                <FaLock className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Button
              className="w-full text-white py-6 text-sm md:text-base"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Separator className="my-6" />
          <div className="flex my-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-6 text-sm md:text-base"
            >
              <FaGoogle className="size-5 mr-2 hover:text-[#247373]" />
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className="text-center text-sm md:text-base mt-4 text-muted-foreground">
            Don&apos;t have an account?
            <Link
              className="text-primary ml-2 hover:underline cursor-pointer font-medium"
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
