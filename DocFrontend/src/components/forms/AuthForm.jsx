import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function AuthForm({ mode, onModeChange, onSubmit }) {
  const [formData, setFormData] = useState(initialState)
  const [sessionType, setSessionType] = useState('local')
  const [errors, setErrors] = useState({})

  const isSignup = mode === 'signup'

  const validate = () => {
    const nextErrors = {}

    if (isSignup && !formData.name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!formData.email.includes('@')) {
      nextErrors.email = 'Enter a valid email.'
    }

    if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    onSubmit({
      mode,
      sessionType,
      formData,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {isSignup ? (
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
          <input
            type="text"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
            placeholder="Enter your name"
          />
          {errors.name ? <span className="mt-2 block text-sm text-rose-600">{errors.name}</span> : null}
        </label>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
        <input
          type="email"
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          placeholder="you@company.com"
        />
        {errors.email ? <span className="mt-2 block text-sm text-rose-600">{errors.email}</span> : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
        <input
          type="password"
          value={formData.password}
          onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          placeholder="Minimum 6 characters"
        />
        {errors.password ? <span className="mt-2 block text-sm text-rose-600">{errors.password}</span> : null}
      </label>

      {isSignup ? (
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Confirm password</span>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword ? (
            <span className="mt-2 block text-sm text-rose-600">{errors.confirmPassword}</span>
          ) : null}
        </label>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-700">Store JWT in</span>
        <select
          value={sessionType}
          onChange={(event) => setSessionType(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        >
          <option value="local">localStorage</option>
          <option value="session">sessionStorage</option>
        </select>
      </label>

      <div className="flex items-center justify-between text-sm">
        <button type="button" className="text-sky-600 hover:text-sky-700">
          Forgot password?
        </button>
        <button
          type="button"
          onClick={() => onModeChange(isSignup ? 'login' : 'signup')}
          className="text-slate-500"
        >
          {isSignup ? 'Have an account?' : 'Create account'}
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
      >
        {isSignup ? 'Create account' : 'Login'}
      </button>
    </form>
  )
}

export default AuthForm
