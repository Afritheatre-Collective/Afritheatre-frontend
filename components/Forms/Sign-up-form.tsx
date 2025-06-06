"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaPhone,
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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (e.target.id === "password" || e.target.id === "confirmPassword") {
      setPasswordError("");
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePasswords()) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!", {
          position: "bottom-right",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        // Redirect to login page after successful registration
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error", {
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
            Register
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-center text-accent-foreground">
            Use email or service to create account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-none border-x-0 border-t-0 border-b-2 pl-4 pr-10 py-5 text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                  required
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

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
              <Label htmlFor="phone" className="text-sm md:text-base">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-none border-x-0 border-t-0 border-b-2 pl-4 pr-10 py-5 text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                  required
                />
                <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm md:text-base">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-none border-x-0 border-t-0 border-b-2 pl-4 pr-10 py-5 text-sm md:text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b-primary"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {showConfirmPassword ? (
                    <FaEyeSlash
                      className="text-gray-400 cursor-pointer"
                      onClick={() => setShowConfirmPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="text-gray-400 cursor-pointer"
                      onClick={() => setShowConfirmPassword(true)}
                    />
                  )}
                </div>
                <FaLock className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {passwordError && (
                <p className="text-sm text-red-500 mt-2">{passwordError}</p>
              )}
            </div>

            <Button
              className="w-full text-white py-6 text-sm md:text-base"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Separator className="my-6" />
          <div className="flex my-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-6 text-sm md:text-base"
            >
              <FaGoogle className="size-5 mr-2" />
              <span>Continue with Google</span>
            </Button>
          </div>
          <p className="text-center text-sm md:text-base mt-4 text-muted-foreground">
            Already have an account?
            <Link
              className="text-primary ml-2 hover:underline cursor-pointer font-medium"
              href="/login"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
