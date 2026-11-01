export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Join SkillBridge and start building your future</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Full Name</label>
            <input
              type="text"
              placeholder="Edimond Morara"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account? <a href="/login" className="font-medium text-cyan-300">Sign in</a>
        </p>
      </div>
    </div>
  );
}
