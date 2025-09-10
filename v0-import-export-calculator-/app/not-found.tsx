import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => router.back()}
            className="w-full"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="w-full"
          >
            Go Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}