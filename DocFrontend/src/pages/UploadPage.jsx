import { useContext, useRef, useState } from "react";
import axios from "axios";
import { analysisModes } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userDataContext } from "../Context/userDataContext";

function UploadPage({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("all");
  const [language, setLanguage] = useState("en");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef();
  const navigate = useNavigate();
  const { serverURL } = useContext(userDataContext);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size === 0) {
      toast.error("This file is empty. Please choose a file with content.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("File must be under 50MB");
      return;
    }

    setFile(selectedFile);
    toast.success("File selected");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await axios.post(
        `${serverURL}/api/documents/upload`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const documentId = uploadResponse.data?.data?.document?._id;
      if (!documentId) {
        throw new Error("Upload succeeded but no document ID was returned.");
      }

      const analysisResponse = await axios.post(
        `${serverURL}/api/analysis/run`,
        { documentId, mode, language },
        { withCredentials: true }
      );

      const analysisId = analysisResponse.data?.data?.analysisId;
      toast.success("Document uploaded and analysis started");
      onUploadComplete?.();
      navigate(
        analysisId
          ? `/document/${documentId}?analysisId=${analysisId}`
          : `/document/${documentId}`
      );
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Upload failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="pb-16 text-center">
          <h1 className="text-4xl font-black sm:text-5xl lg:text-6xl">
            Upload & Analyze Documents
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Get insights, summaries, sentiment & more instantly
          </p>
        </section>

        <section
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="rounded-3xl border-2 border-dashed bg-white p-10 text-center transition hover:bg-gray-50"
        >
          <div className="text-4xl">Folder</div>

          <p className="mt-4 text-xl font-semibold">Drag & drop your document</p>
          <p className="text-gray-500">or click below to browse</p>

          <button
            onClick={() => fileRef.current.click()}
            className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
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

          {file ? (
            <div className="mt-6 text-sm font-medium text-blue-600">
              Selected: {file.name}
            </div>
          ) : null}

          <div className="mt-4 flex justify-center gap-3 text-sm">
            {[".txt", ".pdf", ".docx"].map((type) => (
              <span key={type} className="rounded-full bg-gray-100 px-3 py-1">
                {type}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Analysis mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="all">Full analysis</option>
                  <option value="summarization">Summarization</option>
                  <option value="sentiment">Sentiment</option>
                  <option value="categorization">Categorization</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Document language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                  <option value="ar">Arabic</option>
                  <option value="ru">Russian</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={isSubmitting}
            className="mt-6 rounded-xl bg-blue-600 px-8 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Uploading..." : "Upload & Analyze"}
          </button>
        </section>

        <section className="mt-16">
          <h2 className="text-center text-3xl font-bold">Analysis Features</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {analysisModes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-5 transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UploadPage;
