"use client";

import Link from "next/link";
import React, { useState } from "react";

import { FaGoogle } from "react-icons/fa";

import { TriangleAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const [error, setError] = useState(null);
  return (
    <div className="h-full flex items-center justify-center backdrop-blur-lg">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 my-10 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create account
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="px-2 sm:px-6">
          <form className="space-y-3">
            <Input type="text" placeholder="Full name" required />
            <Input type="email" placeholder="email" required />
            <Input type="password" placeholder="password" required />
            <Input type="password" placeholder="confirm password" required />
            <Button className="w-full" size="lg">
              continue
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
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="sign-in"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
