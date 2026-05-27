import { supabase } from "@/lib/supabase";

async function getAudit(id: string) {
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const audit = await getAudit(id);

  if (!audit) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Audit not found
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold">
          Shared Audit Report
        </h1>

        <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-xl p-6">
          <div className="space-y-5">
            <div>
              <p className="text-gray-400">
                Monthly Savings
              </p>

              <h2 className="text-4xl font-bold text-green-400">
                $
                {
                  audit.total_monthly_savings
                }
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Annual Savings
              </p>

              <h2 className="text-4xl font-bold text-green-400">
                $
                {
                  audit.total_annual_savings
                }
              </h2>
            </div>

            <div>
              <p className="text-gray-400">
                Recommendation
              </p>

              <p className="mt-2">
                {audit.ai_summary}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Tool Data
              </p>

              <pre className="mt-2 bg-black p-4 rounded overflow-auto text-sm">
                {JSON.stringify(
                  audit.tool_data,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}