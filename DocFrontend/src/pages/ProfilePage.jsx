function ProfilePage() {
  return (
    <div className="max-w-4xl rounded-[1.8rem] border border-stone-200 bg-white p-5 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Account</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Settings</h1>
      <div className="mt-10 grid gap-5">
        <input
          type="text"
          defaultValue="Shraddha Jain"
          className="rounded-2xl border border-stone-200 px-5 py-4 text-base outline-none"
        />
        <input
          type="email"
          defaultValue="shraddha@docuwise.ai"
          className="rounded-2xl border border-stone-200 px-5 py-4 text-base outline-none"
        />
        <input
          type="password"
          placeholder="Change password"
          className="rounded-2xl border border-stone-200 px-5 py-4 text-base outline-none"
        />
        <button
          type="button"
          className="w-full rounded-2xl bg-[#1d1a14] px-6 py-4 text-base font-semibold text-white sm:w-fit"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
