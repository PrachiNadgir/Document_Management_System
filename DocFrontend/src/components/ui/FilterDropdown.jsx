function FilterDropdown({ label, options, value, onChange, variant = 'light' }) {
  const isDark = variant === 'dark'

  return (
    <label className="block">
      <span
        className={`mb-2 block text-xs font-medium uppercase tracking-[0.15em] ${
          isDark ? 'text-white' : 'text-stone-400'
        }`}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl px-4 py-3 text-sm outline-none transition ${
          isDark
            ? 'border border-[#496ca5] bg-[#273047] text-white focus:border-[#76b6ff]'
            : 'border border-stone-200 bg-white text-stone-700 focus:border-[#2f67e9]'
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default FilterDropdown
