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

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
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
    <div className="h-full flex items-center justify-center backdrop-blur-lg">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 my-10 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service to create account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-primary"
                required
              />
            </div>

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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-b-primary"
                required
              />
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <Button
              className="w-full text-white"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
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
            Already have an account?
            <Link
              className="text-sky-700 ml-2 hover:underline cursor-pointer"
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
