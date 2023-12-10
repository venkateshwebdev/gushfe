"use client";

import GlowSpinner from "@/components/GlowSpinner";
import GradientText from "@/components/GradientText";
import ResultViwer from "@/components/ResultViwer";
import {
  createProcess,
  deleteProcess,
  getProcess,
  getProcesses,
  updateProcess,
} from "@/utils/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Page({ params, searchParams }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const router = useRouter();

  const { id } = params;
  const { ai } = searchParams;

  const loadInitialData = async (id) => {
    setIsLoading(true);
    const results = await getProcess(id);
    if (results.data) {
      setData(results.data);
      toast.success("Process loaded successfully");
    } else {
      setError("Something went wrong");
    }
    setIsLoading(false);
  };

  const onSaveProcess = async (process) => {
    setIsLoading(true);
    if (process.id === "new") {
      const data = await createProcess(process);
      setData(data.data);
      toast.success("Process Saved successfully");
      router.replace(`/process/${data.data._id}`);
    } else {
      const data = await updateProcess(process);
      toast.success("Process Updated successfully");
      setData(data.data);
    }
    setIsLoading(false);
  };
  const onDeleteProcess = async (id) => {
    setIsLoading(true);
    if (id !== "new") await deleteProcess(id);
    toast.success("Process Deleted successfully");
    router.push("/process");
    setIsLoading(false);
  };

  useEffect(() => {
    if (id === "new") {
      if (Boolean(ai)) {
        const localData = JSON.parse(localStorage.getItem("process"));
        if (localData) setData({ ...localData, createdByAI: true });
        localStorage.removeItem("process");
        toast.success("Successful. Please Edit and save the process.");
      } else {
        setData({
          name: "Enter a name for process",
          steps: [],
          createdByAI: false,
        });
      }
    } else {
      loadInitialData(id);
    }
  }, [id, ai]);

  if (isLoading) return <GlowSpinner />;

  return (
    <div className="w-full h-full">
      {data && (
        <ResultViwer
          data={data}
          onSaveProcess={onSaveProcess}
          onDeleteProcess={onDeleteProcess}
        />
      )}
    </div>
  );
}
