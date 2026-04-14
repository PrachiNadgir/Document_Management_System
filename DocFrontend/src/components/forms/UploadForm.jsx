import { useState } from 'react'

const acceptedTypes = ['pdf', 'docx', 'txt']

function UploadForm({ onUpload }) {
  const [error, setError] = useState('')

  const handleFile = (file) => {
    if (!file) {
      return
    }

    const extension = file.name.split('.').pop()?.toLowerCase()

    if (!acceptedTypes.includes(extension)) {
      setError('File type not supported. Please upload PDF, DOCX, or TXT.')
      return
    }

    setError('')
    onUpload(file)
  }

  return (
    <section className="rounded-3xl border border-dashed border-sky-300 bg-sky-50 p-6">
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-sky-200 bg-white px-6 py-10 text-center">
        <p className="text-lg font-semibold text-slate-900">Drag and drop document</p>
        <p className="max-w-md text-sm text-slate-500">
          PDF, DOCX, and TXT files are supported. This scaffold simulates upload progress and extracted text preview.
        </p>
        <label className="cursor-pointer rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
          Choose file
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
      </div>
      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}
    </section>
  )
}

export default UploadForm
