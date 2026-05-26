"use client";

import { useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [spend, setSpend] = useState("");
  const [seats, setSeats] = useState("");

  const [result, setResult] =
    useState<any>(null);

  const generateAudit = () => {
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

    setResult({
      currentSpend: spend,
      monthlySavings,
      annualSavings:
        monthlySavings * 12,
      recommendation,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold">
          AI Spend Audit
        </h1>

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
          </select>

          <input
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value)
            }
            placeholder="Plan"
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
            className="bg-white text-black px-6 py-3 rounded w-full"
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

                  <p>
                    {
                      result.recommendation
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}