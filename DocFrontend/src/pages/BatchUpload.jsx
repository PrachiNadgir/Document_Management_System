import { useRef } from "react";

function BatchUploadPage() {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (e) => {
    const files = e.target.files;
    console.log(files);
    // TODO: send to backend
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold">Batch upload</h1>
      <p className="text-gray-500 mt-2">
        Process multiple documents at once
      </p>

      <div
        onClick={handleClick}
        className="mt-8 border-2 border-dashed rounded-xl p-16 text-center cursor-pointer hover:bg-gray-50"
      >
        <div className="text-4xl mb-4">📁</div>
        <p className="text-lg font-medium">Drop multiple files here</p>
        <p className="text-sm text-gray-500 mt-2">
          Supports .txt, .pdf, .docx — up to 50 files
        </p>

        <button className="mt-6 bg-black text-white px-6 py-2 rounded-xl">
          Select files
        </button>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFiles}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default BatchUploadPage;