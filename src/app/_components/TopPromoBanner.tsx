"use client";
import { FC, ReactNode } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";

interface TopPromoBannerProps {
  children: ReactNode;
}

const TopPromoBanner: FC<TopPromoBannerProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="container relative flex flex-col justify-between pb-4 overflow-hidden h-fit w-fit">
      {children}
    </div>
  );
};

export default TopPromoBanner;
