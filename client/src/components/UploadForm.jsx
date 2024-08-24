import axios from "axios";
import { useState } from "react";

const UploadForm = () => {
  const [input, setInput] = useState(null);
  const handleUpload = () => {
    if (!input) {
      alert("Please select an image");
    }
    const formData = new FormData();
    formData.append("image", input);
    axios
      .post("http://localhost:3050/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("upload successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col gap-6 items-start">
      <h1 className="font-bold text-4xl text-neutral-700">
        Upload images here
      </h1>
      <input type="file" onChange={(e) => setInput(e.target.files[0])} />
      <button
        type="button"
        onClick={handleUpload}
        className="px-4 py-2 bg-neutral-800 text-white font-semibold text-sm rounded-lg self-end opacity-80 hover:opacity-100 duration-200 transition-opacity"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadForm;
