export function generateVerdict({ scenario, risk, reasons, hasIncomeBeforePurchase }) {
  if (scenario.id === 'wait' && hasIncomeBeforePurchase) return { recommendation: 'Wait 12 days', explanation: 'Waiting lets your expected income arrive before the purchase and keeps more room for commitments.' }
  if (risk === 'Critical') return { recommendation: 'Choose a safer path', explanation: 'This decision breaks under the emergency test. Consider waiting, EMI, or a lower-cost option.' }
  if (scenario.id === 'emi') return { recommendation: 'Use EMI with care', explanation: 'EMI protects cash today, but adds a payment you will need to plan for each month.' }
  if (scenario.id === 'alternative') return { recommendation: 'Choose the alternative', explanation: 'The lower price leaves a healthier safety buffer without stopping your plans.' }
  return { recommendation: risk === 'High' ? 'Wait 12 days' : 'Proceed carefully', explanation: reasons[0] || 'This decision fits within your current plan.' }
}
