import React, { useState } from "react";
import OpenAI from "openai";
import axiosAuth from "@/utils/axiosAuth";
import { getProcess, getProcesses } from "@/utils/services";
import GlowButton from "../GlowButton";
import GradientText from "../GradientText";
import GlowSpinner from "../GlowSpinner";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditArea = (props) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const makeRequest = (text) => {
    setLoading(true);
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAPI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a process definitions builder. You take user input and give the process definitions in clear and concise in json output. the structure should be { name: processName, steps: [ { id: number, title: step title, description: step description } ]",
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.error) {
          toast.error(data.error.message);
        } else {
          const dataObj = data["choices"][0]["message"]["content"];
          console.log(dataObj);
          // Save in the local storage.
          localStorage.setItem("process", dataObj);
          // route to /process/new?ai
          router.push("/process/new?ai=true");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Connection to AI failed");
      });
  };

  // const makeRequest = (text) => {
  //   const mm = {
  //     id: "chatcmpl-8UA09bWmZDZkQmi5EkDR2z8xx7GO5",
  //     object: "chat.completion",
  //     created: 1702198977,
  //     model: "gpt-3.5-turbo-0613",
  //     choices: [
  //       {
  //         index: 0,
  //         message: {
  //           role: "assistant",
  //           content:
  //             '{\n  "name": "Build an Android Robot",\n  "steps": [\n    {\n      "id": 1,\n      "title": "Gather Materials",\n      "description": "Collect all the necessary materials for building the Android robot. This may include a microcontroller board, servos, sensors, wires, batteries, and other components."\n    },\n    {\n      "id": 2,\n      "title": "Design the Robot",\n      "description": "Create a design plan for the Android robot, including its physical structure, size, and functionality. Consider the specific features you want the robot to have, such as movement, sensing capabilities, and interaction with the environment."\n    },\n    {\n      "id": 3,\n      "title": "Assemble the Body",\n      "description": "Start building the physical body of the Android robot according to your design plan. Connect the necessary components, mount the servos, and ensure everything fits together properly."\n    },\n    {\n      "id": 4,\n      "title": "Add Electronics",\n      "description": "Integrate the microcontroller board, sensors, and other electronic components into the robot\'s body. Make sure all connections are secure and functional."\n    },\n    {\n      "id": 5,\n      "title": "Program the Robot",\n      "description": "Write the code that controls the Android robot\'s behavior. This may involve programming the microcontroller board using a suitable programming language and IDE. Implement the desired functionalities, such as movement, obstacle avoidance, or communication with external devices."\n    },\n    {\n      "id": 6,\n      "title": "Test and Troubleshoot",\n      "description": "Test the Android robot\'s functionality to ensure that it behaves as intended. Troubleshoot any issues or bugs that arise during testing, and make necessary adjustments or corrections to the code or hardware."\n    },\n    {\n      "id": 7,\n      "title": "Refine and Enhance",\n      "description": "Iteratively improve the robot\'s design, code, and functionality based on user feedback or your own observations. Consider adding additional features or optimizations to make the Android robot more capable or efficient."\n    },\n    {\n      "id": 8,\n      "title": "Finalize and Document",\n      "description": "Complete the construction and testing of the Android robot. Document the entire process, including the design, materials used, code, and any modifications made. This documentation will be useful for future reference or for sharing your project with others."\n    }\n  ]\n}',
  //         },
  //         finish_reason: "stop",
  //       },
  //     ],
  //     usage: {
  //       prompt_tokens: 68,
  //       completion_tokens: 524,
  //       total_tokens: 592,
  //     },
  //     system_fingerprint: null,
  //   };
  //   const data = mm["choices"][0]["message"]["content"];
  //   console.log(mm["choices"][0]["message"]["content"]);
  //   // Save in the local storage.
  //   localStorage.setItem("process", data);
  //   // route to /process/new?ai
  //   router.push("/process/new?ai=true");
  // };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const inputDiv = form.querySelector("input");
    const searchText = inputDiv.value;
    makeRequest(searchText);
  };

  return (
    <div className="w-[40vw]">
      <form
        className="flex flex-col gap-7 items-center"
        onSubmit={onSubmitHandler}
      >
        <div
          className={`flex justify-center ${loading ? "animate-pulse" : ""}`}
        >
          <GradientText
            text={
              loading
                ? "AI is building your process.. Please wait"
                : "Ask AI to create a process"
            }
          />
        </div>

        {loading && (
          <div className="flex items-center gap-4">
            <GlowSpinner />
          </div>
        )}
        {!loading && (
          <div className="flex w-full gap-4">
            <input
              id="message"
              className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type your process title..."
            ></input>

            <div className="flex justify-center">
              <GlowButton text="Generate" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditArea;
