import { UserCircle2, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-2xl font-bold text-slate-950">
            E
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">Edimond Morara</h1>
            <p className="mt-2 text-cyan-300">Frontend Developer • UI/UX Enthusiast</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <UserCircle2 size={18} />
              <h2 className="text-lg font-semibold">Profile overview</h2>
            </div>
            <p className="text-slate-300">
              I am passionate about building accessible, responsive digital products and improving my practical skills in web design and software engineering.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <Mail size={18} />
              <h2 className="text-lg font-semibold">Contact details</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <div>edimond@example.com</div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Nairobi, Kenya
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "SQL",
              "UI Design",
              "Project Planning",
            ].map((skill) => (
              <span key={skill} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
