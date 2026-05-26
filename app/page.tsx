"use client";

import { useEffect, useState } from "react";

const tools = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "Anthropic API",
  "OpenAI API",
  "Gemini",
  "Windsurf",
];

export default function Home() {
  const [formData, setFormData] = useState({
    tool: "",
    plan: "",
    monthlySpend: "",
    seats: "",
    teamSize: "",
    useCase: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("audit-form");

    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify(formData)
    );
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold">
          AI Spend Audit
        </h1>

        <p className="mt-4 text-gray-400">
          Discover how much your startup can
          save on AI tooling.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label className="block mb-2">
              AI Tool
            </label>

            <select
              name="tool"
              value={formData.tool}
              onChange={handleChange}
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            >
              <option value="">
                Select tool
              </option>

              {tools.map((tool) => (
                <option key={tool} value={tool}>
                  {tool}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Current Plan
            </label>

            <input
              type="text"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              placeholder="Pro / Team / Enterprise"
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              name="monthlySpend"
              value={formData.monthlySpend}
              onChange={handleChange}
              placeholder="100"
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2">
              Number of Seats
            </label>

            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="5"
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2">
              Team Size
            </label>

            <input
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              placeholder="10"
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2">
              Primary Use Case
            </label>

            <select
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
            >
              <option value="">
                Select use case
              </option>

              <option value="coding">
                Coding
              </option>

              <option value="writing">
                Writing
              </option>

              <option value="research">
                Research
              </option>

              <option value="data">
                Data
              </option>

              <option value="mixed">
                Mixed
              </option>
            </select>
          </div>

          <button
            className="w-full bg-white text-black font-semibold py-3 rounded"
          >
            Generate Audit
          </button>
        </div>
      </div>
    </main>
  );
}