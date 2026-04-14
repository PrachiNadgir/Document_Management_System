import { useRef, useState } from "react";

function ComparePage() {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);

  const inputA = useRef();
  const inputB = useRef();

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold">Compare documents</h1>
      <p className="text-gray-500 mt-2">
        Upload two documents and see how they differ
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        
        {/* Document A */}
        <div
          onClick={() => inputA.current.click()}
          className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50"
        >
          <div className="text-3xl mb-3">📄</div>
          <p className="font-medium">
            {fileA ? fileA.name : "Document A"}
          </p>
          <p className="text-sm text-gray-500">
            Click to upload
          </p>

          <input
            type="file"
            ref={inputA}
            onChange={(e) => setFileA(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Document B */}
        <div
          onClick={() => inputB.current.click()}
          className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-gray-50"
        >
          <div className="text-3xl mb-3">📄</div>
          <p className="font-medium">
            {fileB ? fileB.name : "Document B"}
          </p>
          <p className="text-sm text-gray-500">
            Click to upload
          </p>

          <input
            type="file"
            ref={inputB}
            onChange={(e) => setFileB(e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

      {/* Compare Button */}
      <div className="mt-8 text-center">
        <button
          disabled={!fileA || !fileB}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
        >
          Compare documents
        </button>
      </div>
    </div>
  );
}

export default ComparePage;