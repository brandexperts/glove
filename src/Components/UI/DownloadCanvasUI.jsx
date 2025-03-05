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
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Format the glove configuration data as HTML for email
  const formatGloveConfig = () => {
    return `
      Affiliate: ${affiliate}
      Padding: ${paddingSelection}
      Ounces: ${ouncesSelection}
      Closure System: ${selectedClosure}
      Fist Logo: ${src}
      Text: ${textInput}
      Text Color: ${textColor}
    `;
  };

  // Function to dynamically generate checkout URL
  const getCheckoutURL = () => {
    let variationId;

    if (selectedClosure === "Velcro" && paddingSelection === "Dual ProLatX") {
      variationId = "3358";
    } else if (selectedClosure === "Laces" && paddingSelection === "Dual ProLatX") {
      variationId = "3359";
    } else if (selectedClosure === "Velcro" && paddingSelection === "Dual ProLatX + Hol") {
      variationId = "3360";
    } else if (selectedClosure === "Laces" && paddingSelection === "Dual ProLatX + Hol") {
      variationId = "3361";
    }

    return variationId
      ? `https://boxeliteclub.com/checkouts/checkout/?aero-add-to-checkout=${variationId}`
      : "#";
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 flex flex-col justify-center items-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {/* Glove Customization Images */}
          <div ref={captureEl} className="w-full h-auto">
            <div className="flex justify-evenly items-center">
              <div className="text-sm text-slate-800 font-semibold">Ounces: {ouncesSelection}</div>
              <div className="text-sm text-slate-800 font-semibold">Padding: {paddingSelection}</div>
            </div>

            <div className="p-4 bg-gray-100 rounded-md shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">Glove Customization Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {gloveParts.map((part) => (
                  <div
                    key={part.name}
                    className="bg-white rounded-md shadow-sm p-2 border border-gray-200 hover:shadow transition-shadow duration-300"
                  >
                    <div className="font-semibold text-gray-700 mb-1 text-sm">{part.name}</div>
                    <div
                      className="mb-1 p-1 rounded text-center text-xs font-medium"
                      style={{ backgroundColor: part.color, color: part.color === "#000000" ? "white" : "black" }}
                    >
                      {part.color}
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs text-center font-medium ${
                      part.finish === "Metallic" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}>
                      {part.finish}
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ Buy Now Button Below Glove Customization Details ✅ */}
              <a
                href={getCheckoutURL()}
                className="btn mt-4 w-full text-center"
                style={{
                  backgroundColor: "#28a745", // Green color
                  color: "white",
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "block",
                  textAlign: "center",
                  borderRadius: "8px"
                }}
              >
                Buy Now
              </a>
            </div>
          </div>

          {/* Download Button */}
          <button className="btn btn-neutral my-3" onClick={() => alert("Download logic goes here!")}>
            Download
          </button>
        </div>
      </dialog>
    </>
  );
};

export { DownloadCanvasUI, useTakeImage };
