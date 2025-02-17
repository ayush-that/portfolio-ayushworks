"use client";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      className="flex h-full items-center gap-2 p-0 text-ring"
      onClick={() => router.back()}
    >
      <MoveLeft className="size-4" />
      {children}
    </Button>
  );
};

export default BackButton;
