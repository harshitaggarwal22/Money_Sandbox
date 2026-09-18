export function calculateRisk({ buffer, commitments, goalImpact, crashBuffer }) {
  const reasons = []
  if (crashBuffer < 0) reasons.push('An emergency expense would push the balance below zero.')
  if (buffer < 3000) reasons.push('Your safety buffer falls below ₹3,000.')
  else if (buffer < 7000) reasons.push('Your safety buffer is tight for the next 30 days.')
  if (commitments > buffer) reasons.push('Upcoming commitments are large compared with your buffer.')
  if (goalImpact > 25) reasons.push('This decision materially slows your Goa Trip goal.')
  const score = (crashBuffer < 0 ? 4 : 0) + (buffer < 3000 ? 3 : buffer < 7000 ? 2 : buffer < 12000 ? 1 : 0) + (goalImpact > 25 ? 1 : 0)
  const risk = score >= 5 ? 'Critical' : score >= 3 ? 'High' : score >= 1 ? 'Medium' : 'Low'
  return { risk, reasons: reasons.length ? reasons : ['Your buffer remains healthy after expected commitments.'] }
}
