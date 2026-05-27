/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");

  const [auditId, setAuditId] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const generateAudit = async () => {
    let monthlySavings = 0;
    let recommendation = "";

    if (
      tool === "ChatGPT" &&
      plan.toLowerCase() === "team" &&
      Number(seats) <= 2
    ) {
      monthlySavings = 30;

      recommendation =
        "Switch to ChatGPT Plus";
    } else if (
      tool === "Cursor" &&
      Number(spend) > 60
    ) {
      monthlySavings = 20;

      recommendation =
        "Downgrade to Cursor Pro";
    } else {
      recommendation =
        "Current setup looks optimized";
    }

    const auditData = {
      currentSpend: spend,
      monthlySavings,
      annualSavings:
        monthlySavings * 12,
      recommendation,
    };

    setResult(auditData);

    const { data, error } =
      await supabase
        .from("audits")
        .insert([
          {
            tool_data: {
              tool,
              plan,
              spend,
              seats,
            },

            total_monthly_savings:
              monthlySavings,

            total_annual_savings:
              monthlySavings * 12,

            ai_summary:
              recommendation,
          },
        ])
        .select()
        .single();

    console.log(data);
    console.log(error);

    if (data) {
      setAuditId(data.id);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold">
          AI Spend Audit
        </h1>

        <p className="mt-4 text-gray-400">
          Discover how much your startup can
          save on AI tooling.
        </p>

        <div className="mt-10 space-y-4">
          <select
            value={tool}
            onChange={(e) =>
              setTool(e.target.value)
            }
            className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          >
            <option value="">
              Select Tool
            </option>

            <option value="ChatGPT">
              ChatGPT
            </option>

            <option value="Cursor">
              Cursor
            </option>

            <option value="Claude">
              Claude
            </option>

            <option value="Gemini">
              Gemini
            </option>
          </select>

          <input
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value)
            }
            placeholder="Plan (Team / Pro / Enterprise)"
            className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          />

          <input
            value={spend}
            onChange={(e) =>
              setSpend(e.target.value)
            }
            placeholder="Monthly Spend"
            type="number"
            className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          />

          <input
            value={seats}
            onChange={(e) =>
              setSeats(e.target.value)
            }
            placeholder="Seats"
            type="number"
            className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          />

          <button
            onClick={generateAudit}
            className="bg-white text-black px-6 py-3 rounded w-full font-semibold"
          >
            Generate Audit
          </button>

          {result && (
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 mt-8">
              <h2 className="text-3xl font-bold">
                Audit Results
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-gray-400">
                    Current Spend
                  </p>

                  <h3 className="text-2xl font-bold">
                    $
                    {
                      result.currentSpend
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Monthly Savings
                  </p>

                  <h3 className="text-2xl font-bold text-green-400">
                    $
                    {
                      result.monthlySavings
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Annual Savings
                  </p>

                  <h3 className="text-2xl font-bold text-green-400">
                    $
                    {
                      result.annualSavings
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Recommendation
                  </p>

                  <p className="mt-1">
                    {
                      result.recommendation
                    }
                  </p>
                </div>

                {result.monthlySavings >
                0 ? (
                  <div className="mt-6 bg-green-500/20 border border-green-500 p-4 rounded-lg">
                    <p className="font-semibold text-green-300">
                      Potential yearly
                      savings detected.
                    </p>

                    <p className="text-sm text-gray-300 mt-1">
                      Credex may help
                      reduce your AI
                      infrastructure
                      costs even further.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 bg-zinc-800 border border-zinc-700 p-4 rounded-lg">
                    <p className="font-semibold">
                      Your setup already
                      looks efficient.
                    </p>
                  </div>
                )}

                <div className="mt-10 border-t border-zinc-700 pt-6">
                  <h3 className="text-2xl font-bold">
                    Get Full Report
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Receive your audit
                    report and future AI
                    spend optimization
                    insights.
                  </p>

                  <div className="mt-6 space-y-4">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 rounded bg-black border border-zinc-700"
                    />

                    <input
                      type="text"
                      placeholder="Company Name (optional)"
                      className="w-full p-3 rounded bg-black border border-zinc-700"
                    />

                    <input
                      type="text"
                      placeholder="Role (optional)"
                      className="w-full p-3 rounded bg-black border border-zinc-700"
                    />

                    <button
                      onClick={() => {
                        if (auditId) {
                          window.location.href = `/audit/${auditId}`;
                        }
                      }}
                      className="w-full bg-green-500 text-black font-semibold py-3 rounded"
                    >
                      Save My Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}