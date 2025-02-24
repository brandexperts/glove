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
  const { selectedClosure } = useClosureStore();
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

  // Format the glove configuration data
  const formatGloveConfig = () => {
    const partsHtml = gloveParts
      .map(
        (part) => `Part Name: ${part.name}\nColor: ${part.color}\nFinish: ${part.finish}`
      )
      .join("\n");

    return `Affiliate: ${affiliate}\nPadding: ${paddingSelection}\nOunces: ${ouncesSelection}\nClosure System: ${selectedClosure}\n${partsHtml}\nFist Logo: ${src}\nText: ${textInput}\nText Color: ${textColor}`;
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
      const canvasRender1 = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      setImageOne(canvasRender1);

      setTake2(true);
      setTimeout(() => {
        const canvasRender2 = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
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
    e.preventDefault();

    if (!isFormValid) {
      result.current.innerHTML = "Please fill out all required fields correctly.";
      return;
    }

    const formData = new FormData(formRef.current);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.current.innerHTML = "Please wait...";
    document.getElementById("my_modal_3").showModal();
    download();
    formRef.current.reset();
    setFormData({ name: "", email: "" });

    // ✅ 1. Send Data to Web3Forms (Keeps Email Submissions Working)
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
        if (response.ok) {
          result.current.innerHTML = "Form submitted successfully!";
        } else {
          result.current.innerHTML = json.message || "Submission failed.";
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        result.current.innerHTML = "Something went wrong!";
      });

    // ✅ 2. Send the Same Data to FunnelKit Automations
    fetch("https://boxeliteclub.com/wp-json/autonami/v1/webhook/?bwfan_autonami_webhook_id=9&bwfan_autonami_webhook_key=980805621f5af66422fbe709d35a014c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(response => response.json())
      .then(data => console.log("Sent to FunnelKit:", data))
      .catch(error => console.error("Error sending to FunnelKit:", error));
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
        <form ref={formRef} className="flex flex-col gap-5" method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="bfcdc5cc-0e88-412c-9d88-05a79a159730" />
          <input type="hidden" name="glove_configuration" value={formatGloveConfig()} />

          <label className="input input-bordered flex items-center">
            <input type="text" name="name" className="grow" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
          </label>

          <label className="input input-bordered flex items-center">
            <input type="email" name="email" className="grow" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          </label>

          <button className={`btn ${!isFormValid ? "btn-disabled opacity-50" : ""}`} type="submit">
            SAVE RESULTS!
          </button>

          <div ref={result} className="font-bold text-green-400 text-lg"></div>
        </form>
      </div>
    </>
  );
};

export { DownloadCanvasUI, useTakeImage };
