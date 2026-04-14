import { useNavigate } from "react-router-dom";

  import { useState } from "react";

function CollaborationPage() {
  const navigate = useNavigate();


const [email, setEmail] = useState("");

  const collaborationItems = [
    {
      title: "Shared document rooms",
      desc: "Create shared spaces to collaborate on documents with your team.",
    },
    {
      title: "Comments & review threads",
      desc: "Discuss insights and leave feedback directly on documents.",
    },
    {
      title: "Version approvals",
      desc: "Manage document versions and approval workflows easily.",
    },
  ];

  const integrationItems = [
    {
      title: "Batch upload API",
      desc: "Upload multiple documents programmatically.",
    },
    {
      title: "Webhook notifications",
      desc: "Get real-time updates on document processing.",
    },
    {
      title: "Structured JSON results",
      desc: "Integrate analysis results into your systems.",
    },
  ];

  return (
    <div className="px-4 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-10">

        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
              Collaboration
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
              Work together on documents
            </h1>
            <p className="mt-4 text-lg text-stone-500">
              Collaborate, review, and manage document workflows in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="rounded-2xl bg-[#2f67e9] px-6 py-3 text-white font-semibold"
          >
            + Upload Document
          </button>
        </div>

        <div className="mt-8 rounded-2xl border p-5 bg-[#f9fafb]">
  <h3 className="text-lg font-semibold mb-3">Invite Team Member</h3>

  <div className="flex gap-3">
    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="flex-1 border rounded-xl px-4 py-2"
    />

    <button
      onClick={() => {
        if (!email) {
          alert("Enter email first");
          return;
        }

        alert(`Invitation sent to ${email}`);
        setEmail("");
      }}
      className="bg-[#2f67e9] text-white px-4 py-2 rounded-xl"
    >
      Invite
    </button>
  </div>
</div>

        {/* COLLAB FEATURES */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {collaborationItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] bg-[#eef2ff] p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/library")}
            className="rounded-xl border px-5 py-3 text-sm font-medium"
          >
            View Documents
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="rounded-xl border px-5 py-3 text-sm font-medium"
          >
            Open Analytics
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="rounded-xl border px-5 py-3 text-sm font-medium"
          >
            Team Settings
          </button>
        </div>

        {/* INTEGRATIONS */}
        <div className="mt-12 rounded-[1.8rem] bg-[#f7f4ee] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-400">
            Integrations
          </p>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {integrationItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] bg-white p-6 hover:shadow-md transition"
              >
                <h4 className="text-md font-semibold text-stone-900">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CollaborationPage;