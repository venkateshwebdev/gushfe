"use client";
import GradientText from "@/components/GradientText";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center gap-10">
      <div className="flex justify-center">
        <GradientText text="AI Powered Process Builder Application" />
      </div>
      <div className="mb-32 gap-4 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <div
          onClick={() => {
            router.push("/ai");
          }}
          className="cursor-pointer group text-center rounded-lg border border-transparent px-5 py-10 transition-colors hover:border-gray-800 hover:bg-gray-100 dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Create with AI{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="w-full flex justify-center">
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Use our intelligent AI to create a Process definitions for you.
              You can rearrange and modify if you wish.
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/process/new");
          }}
          className="cursor-pointer group text-center rounded-lg border border-transparent px-5 py-10 transition-colors hover:border-gray-800 hover:bg-gray-100  hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-center`}>
            Create Manually{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="w-full flex justify-center">
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Create the Process and steps by yourself. You can edit, modify and
              arrange steps and save.
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/process");
          }}
          className="cursor-pointer group text-center rounded-lg border border-transparent px-5 py-10 transition-colors hover:border-gray-800 hover:bg-gray-100  hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold text-center`}>
            View All Processes{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="w-full flex justify-center">
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              See all the processes you have created. You can view, arrange and
              edit if you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
