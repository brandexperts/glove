import React, { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { useSelectionStore } from "./PaddingAndOuncesUI";
import html2canvas from "html2canvas-pro";
import { useGlovePartsStore } from "../Models/Glove";
import { useClosureStore, useFistLogo } from "../UI/EditUI";
import { useTextConfig } from "./TextInputUI";

const useTakeImage = create((set) => ({
  take1: false,
  take2: false,
  setTake1: (status) => set({ take1: status }),
  setTake2: (status) => set({ take2: status }),
}));

const DownloadCanvasUI = () => {
  const gloveParts = useGlovePartsStore((state) => state.gloveParts);
  const captureEl = useRef();
  const { paddingSelection, ouncesSelection } = useSelectionStore();
const {   selectedClosure,   } = useClosureStore();
  const { src } = useFistLogo();
  const searchParams = new URLSearchParams(window.location.search);
  const affiliate = searchParams.get("affiliate") || "No Affiliate";
  const formRef = useRef();
  const result = useRef();
  const [imageURL, setImageURL] = useState();

  const { textInput, textColor } = useTextConfig();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Format the glove configuration data as HTML for email
  const formatGloveConfig = () => {
    const partsHtml = gloveParts
      .map(
        (part) => `
    Part Name : ${part.name}
       
          Color: ${part.color} 
          Finish: ${part.finish}
       
    `
      )
      .join("");

    return `
   
Affiliate : ${affiliate}

          Padding: ${paddingSelection}
         Ounces: ${ouncesSelection}
         Closure System: ${selectedClosure}
          ${partsHtml}
      Fist Logo : ${src}

      Text : ${textInput}
      Text Color : ${textColor}

    `;
  };

  const downloadResult = () => {
    if (captureEl.current) {
      html2canvas(captureEl.current, {
        scale: 3,
        useCORS: true,
      })
        .then((canvas) => {
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;

          link.download = "captured-image.png";
          link.click();
        })
        .catch((err) => {
          console.error("Error capturing the canvas:", err);
        });
    } else {
      console.error("captureEl is not defined");
    }
  };

  const { setTake1, setTake2 } = useTakeImage();
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);

  function download() {
    setTake1(true);
    setTimeout(() => {
      const canvas = Array.from(document.getElementsByTagName("canvas"))[1];
      const canvasRender1 = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      setImageOne(canvasRender1);

      setTake2(true);
      setTimeout(() => {
        const canvasRender2 = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        setImageTwo(canvasRender2);

        console.log(imageOne, imageTwo);
      }, 100);
    }, 100);
  }

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleSubmit = (e) => {
    e.preventDefault(); // Always prevent default behavior

    if (!isFormValid) {
      result.current.innerHTML =
        "Please fill out all required fields correctly.";
      return;
    }

    const formData = new FormData(formRef.current);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.current.innerHTML = "Please wait...";
    document.getElementById("my_modal_3").showModal();
    download(); // Capture images after form submission
    formRef.current.reset(); // Reset the form
    setFormData({ name: "", email: "" }); // Reset local state

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
          result.current.innerHTML = "Form submitted successfully!";

          console.log(imageOne, imageTwo);
        } else {
          result.current.innerHTML = json.message || "Submission failed.";
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        result.current.innerHTML = "Something went wrong!";
      })
      .finally(() => {
        // Clear result message after some time
        setTimeout(() => {
          if (result.current) {
            result.current.innerHTML = "";
          }
        }, 3000);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <form
          ref={formRef}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="access_key"
            value="bfcdc5cc-0e88-412c-9d88-05a79a159730"
          />
          {/* value="cd66d220-79b3-4cf0-9f87-d41b7576522c" */}

          {/* Pass additional data to your webhook */}
          <input
            type="hidden"
            name="webhook_url"
            value="https://boxeliteclub.com/wp-json/autonami/v1/webhook/?bwfan_autonami_webhook_id=9&bwfan_autonami_webhook_key=980805621f5af66422fbe709d35a014c"
          />

          {/* CC Email  */}

          <input type="hidden" name="ccemail" value="8el72t0i@robot.zapier.com" />

          {/* Generated Image  */}

          {/* <input type="file" name="photo" /> */}

          <input type="hidde" name="attachment" />
          <input type="hidde" name="attachment" />

          {/* Hidden input with formatted HTML */}
          <input
            type="hidden"
            name="glove_configuration"
            value={formatGloveConfig()}
          />

          <label className="input input-bordered flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="name"
              className="grow"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="input input-bordered flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              className="grow"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>

          <button
            className={`btn ${!isFormValid ? "btn-disabled opacity-50" : ""}`}
            type="submit"
          >
            SAVE RESULTS!
          </button>

          <div ref={result} className=" font-bold text-green-400 text-lg"></div>
        </form>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 flex flex-col justify-center items-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Download Image Selection  */}

          <div ref={captureEl} className=" w-full h-auto">
            <div className=" flex justify-evenly items-center">
              <div className=" text-sm text-slate-800 font-semibold ">
                Ounces : {ouncesSelection}
              </div>
              <div className=" text-sm text-slate-800 font-semibold ">
                Padding : {paddingSelection}
              </div>
            </div>

            <div className="">
              <img src={imageOne} alt="" width={1000} />
              <img src={imageTwo} alt="" width={1000} />
            </div>

            <div className="p-4 bg-gray-100 rounded-md shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Glove Customization Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {gloveParts.map((part) => (
                  <div
                    key={part.name}
                    className="bg-white rounded-md shadow-sm p-2 border border-gray-200 hover:shadow transition-shadow duration-300"
                  >
                    <div className="font-semibold text-gray-700 mb-1 text-sm">
                      {part.name}
                    </div>
                    <div
                      className="mb-1 p-1 rounded text-center text-xs font-medium"
                      style={{
                        backgroundColor: part.color,
                        color: part.color === "#000000" ? "white" : "black",
                      }}
                    >
                      {part.color}
                    </div>
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs text-center font-medium ${
                        part.finish === "Metallic"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {part.finish}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download ////////// */}

          <button
            className="btn btn-neutral my-3"
            onClick={() => {
              downloadResult();
            }}
          >
            Download
          </button>
        </div>
      </dialog>
    </>
  );
};

export { DownloadCanvasUI, useTakeImage };
