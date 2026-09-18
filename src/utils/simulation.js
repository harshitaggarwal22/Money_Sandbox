import { scenarios, crashTests } from '../data/scenarios'

export const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

export function calculateFutureBuffer(scenario, amount, selectedTests) {
  const base = scenario.buffer + (18000 - Number(amount || 0))
  const testCost = selectedTests.reduce((sum, id) => sum + (crashTests.find(test => test.id === id)?.effect || 0), 0)
  return Math.max(0, base - testCost)
}

export function calculateRisk(scenario, buffer, selectedTests) {
  const pressure = selectedTests.length * 8 + Math.max(0, 7000 - buffer) / 700
  const score = Math.min(96, Math.round(scenario.stress + pressure))
  return { score, label: score >= 65 ? 'High' : score >= 38 ? 'Medium' : 'Low' }
}

export function calculateGoalImpact(scenario, selectedTests) {
  return Math.min(-3, scenario.impact - selectedTests.length * 5)
}

export function runCrashTest(scenario, amount, selectedTests) {
  const buffer = calculateFutureBuffer(scenario, amount, selectedTests)
  const risk = calculateRisk(scenario, buffer, selectedTests)
  return { buffer, risk, goalImpact: calculateGoalImpact(scenario, selectedTests) }
}

export function generateVerdict(scenario, result) {
  if (result.risk.label === 'High') return { title: 'Wait 12 days', note: 'Upcoming commitments and your predicted weekend spending make this purchase risky today.' }
  if (scenario.id === 'wait') return { title: 'Wait 12 days', note: 'Your commitments clear before the purchase, preserving a healthier financial buffer.' }
  return { title: scenario.name, note: 'This route keeps your financial plans more resilient than buying at full price today.' }
}

export function simulateDecision({ scenarioId, amount, selectedTests }) {
  const scenario = scenarios.find(item => item.id === scenarioId) || scenarios[0]
  const results = runCrashTest(scenario, amount, selectedTests)
  return { scenario, ...results, verdict: generateVerdict(scenario, results) }
}

export function buildTimeline(buffer, risk) {
  const points = [32000, 18600, 12100, 7100, buffer]
  return points.map((value, index) => ({ day: index === 0 ? 'Today' : `Day ${[7, 15, 22, 30][index - 1]}`, balance: value, risk: index === 4 ? risk : index > 2 ? 'Watch' : 'Stable', commitments: [12600, 9400, 6100, 2400, 0][index], spending: [0, 2800, 3900, 2800, 1900][index] }))
}
