/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateAudit(data: any) {
  return {
    currentMonthlySpend: 100,
    monthlySavings: 30,
    annualSavings: 360,
    recommendation:
      "Switch to ChatGPT Plus",
    reason:
      "Small teams usually do not require Team plans.",
  };
}