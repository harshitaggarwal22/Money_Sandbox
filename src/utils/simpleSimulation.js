const BASE_BALANCE = 32000
const EXPECTED_EXPENSES = 4600

export const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

export const scenarios = [
  { id: 'buy-now', label: 'Buy now', note: 'Pay for it today', timingCost: 6200, purchaseFactor: 1, riskBase: 72 },
  { id: 'wait', label: 'Wait 12 days', note: 'Let bills clear first', timingCost: 0, purchaseFactor: 1, riskBase: 23 },
  { id: 'emi', label: 'Use EMI', note: 'Split into monthly payments', timingCost: 1200, purchaseFactor: .32, riskBase: 39 },
  { id: 'alternative', label: '₹12K alternative', note: 'Choose a lower-cost option', timingCost: 1300, purchaseFactor: 12000 / 18000, riskBase: 17 }
]

export function calculateFutureBalance({ currentBalance = BASE_BALANCE, expectedExpenses = EXPECTED_EXPENSES, scenario, purchaseAmount }) {
  const chosen = scenario || scenarios[0]
  const purchaseCost = Number(purchaseAmount || 0) * chosen.purchaseFactor
  return Math.max(0, currentBalance - expectedExpenses - chosen.timingCost - purchaseCost)
}

export function calculateProjectedBuffer(input) {
  return calculateFutureBalance(input)
}

export function calculateGoalImpact(buffer) {
  return Math.max(8, Math.min(82, Math.round(18 + buffer / 400)))
}

export function runCrashTest(buffer, enabled) {
  return enabled ? buffer - 5000 : buffer
}

export function generateVerdict({ scenario, buffer, crashBuffer }) {
  if (crashBuffer < 0) return { title: 'This path is fragile', copy: 'A ₹5,000 emergency would leave you short of money.', risk: 'High' }
  if (scenario.id === 'buy-now') return { title: 'Buying today creates pressure later.', copy: 'Buying the phone today leaves less room for your upcoming expenses.', risk: 'High' }
  if (scenario.id === 'wait') return { title: 'Waiting gives you more breathing room.', copy: 'Your upcoming expenses clear before you make the purchase.', risk: 'Low' }
  if (scenario.id === 'emi') return { title: 'EMI protects cash today.', copy: 'You keep more money now, but add a future payment.', risk: 'Medium' }
  return { title: 'A smaller choice keeps you safer.', copy: 'You protect your cash buffer while still getting what you need.', risk: 'Low' }
}

export function calculateScenario({ scenarioId, purchaseAmount, emergency }) {
  const scenario = scenarios.find(item => item.id === scenarioId) || scenarios[0]
  const buffer = calculateProjectedBuffer({ scenario, purchaseAmount })
  const crashBuffer = runCrashTest(buffer, emergency)
  const verdict = generateVerdict({ scenario, buffer, crashBuffer })
  const goalOnTrack = calculateGoalImpact(emergency ? crashBuffer : buffer)
  const expectedSpending = EXPECTED_EXPENSES + scenario.timingCost
  const purchaseCost = Math.round(Number(purchaseAmount || 0) * scenario.purchaseFactor)
  const beforePurchase = BASE_BALANCE - expectedSpending
  return { scenario, buffer, crashBuffer, verdict, goalOnTrack, expectedSpending, purchaseCost, beforePurchase }
}

export function buildSimpleTimeline(result) {
  const end = result.emergency ? result.crashBuffer : result.buffer
  const start = BASE_BALANCE
  const points = [start, Math.round(start - (start - end) * .42), Math.round(start - (start - end) * .72), end]
  return ['Today', 'Day 7', 'Day 15', 'Day 30'].map((day, index) => ({ day, balance: points[index] }))
}
