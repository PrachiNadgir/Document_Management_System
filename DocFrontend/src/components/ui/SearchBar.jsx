function SearchBar({ onSearchChange }) {
  return (
    <label className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 lg:w-72">
      <span className="text-sm text-stone-400">Search</span>
      <input
        type="search"
        placeholder="documents, summaries..."
        className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  )
}

export default SearchBar
