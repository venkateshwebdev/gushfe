"use client";

import GlowButton from "@/components/GlowButton";
import GradientText from "@/components/GradientText";
import GlowSpinner from "@/components/GlowSpinner";
import ArrowButton from "@/components/ArrowButton";
import { getProcesses } from "@/utils/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const loadInitialData = async () => {
    setIsLoading(true);
    const results = await getProcesses();
    if (results.data) {
      setData(results.data);
      toast.success("All your processes has been loaded");
    } else {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  if (isLoading) return <GlowSpinner />;

  return (
    <div className="w-full h-full flex flex-col justify-around text-center items-center">
      <div className="w-full flex justify-center">
        <GradientText text="All processes" />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {data?.map((item) => {
          return (
            <div
              className="cursor-pointer  min-w-[380px] relative items-center px-6 py-4 text-xl rounded-lg flex flex-col gap-2 font-semibold backdrop-blur-lg bg-gray-800 text-white"
              key={item._id}
              onClick={() => {
                router.push(`/process/${item._id}`);
              }}
            >
              <div className="w-full flex justify-start">
                <ArrowButton text={item.name} />
              </div>
              <div className="flex justify-between items-center w-full text-sm">
                <p>{item.steps.length} steps</p>
                {item.createdByAI && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    Created by AI
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <GlowButton
        text="Create a new process"
        onClick={() => {
          router.push("/");
        }}
      />
    </div>
  );
}
