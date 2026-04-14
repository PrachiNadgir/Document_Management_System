import { useState, useRef } from "react";
import { analysisModes } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UploadPage() {
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const navigate = useNavigate();

  // 📂 Handle file select
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File must be under 50MB");
      return;
    }

    setFile(selectedFile);
    toast.success("File selected ✅");
  };

  // 📥 Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    // 👉 TODO: send to backend
    console.log("Uploading:", file);

    toast.success("Uploading...");
    setTimeout(() => {
      navigate("/dashboard"); // redirect after upload
    }, 1000);
  };

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <section className="text-center pb-16">
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Upload & Analyze Documents
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            Get insights, summaries, sentiment & more instantly
          </p>
        </section>

        {/* UPLOAD BOX */}
        <section
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-3xl p-10 text-center bg-white hover:bg-gray-50 transition"
        >
          <div className="text-4xl">📁</div>

          <p className="mt-4 text-xl font-semibold">
            Drag & drop your document
          </p>
          <p className="text-gray-500">
            or click below to browse
          </p>

          <button
            onClick={() => fileRef.current.click()}
            className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
          >
            Choose File
          </button>

          <input
            type="file"
            ref={fileRef}
            accept=".pdf,.docx,.txt"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />

          {file && (
            <div className="mt-6 text-sm text-blue-600 font-medium">
              Selected: {file.name}
            </div>
          )}

          <div className="mt-4 flex justify-center gap-3 text-sm">
            {[".txt", ".pdf", ".docx"].map((t) => (
              <span key={t} className="bg-gray-100 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            Upload & Analyze
          </button>
        </section>

        {/* ANALYSIS MODES */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center">
            Analysis Features
          </h2>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {analysisModes.map((mode) => (
              <div
                key={mode.title}
                className="border rounded-2xl p-5 bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                  {mode.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default UploadPage;