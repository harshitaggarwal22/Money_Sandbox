import { scenarioDefinitions } from '../data/demoData'
import { calculateRisk } from './riskEngine'
import { calculateGoalImpact } from './goalEngine'
import { runCrashTest } from './crashTestEngine'
import { generateVerdict } from './verdictEngine'

const sum = (items) => items.reduce((total, item) => total + Number(item.amount || 0), 0)
const throughDay = (items, day) => items.filter(item => item.daysUntil <= day)
const eventBalance = (data, scenario, purchaseAmount, day, stressTests = {}) => {
  const delayedIncome = stressTests.salaryDelay ? data.expectedIncome.map(item => ({ ...item, daysUntil: item.daysUntil + 10 })) : data.expectedIncome
  const income = sum(throughDay(delayedIncome, day))
  const expenses = sum(throughDay(data.upcomingExpenses, day))
  const purchase = purchaseEffect(data, scenario, purchaseAmount, day)
  const emergency = stressTests.emergency && day >= 18 ? Number(data.assumptions.emergencyAmount || 0) : 0
  const unexpectedBill = stressTests.unexpectedBill && day >= 20 ? 5000 : 0
  const weekendLift = stressTests.weekend && day >= 7 ? Math.round(data.spendingHistory.filter(item => item.weekend).reduce((total, item) => total + item.amount, 0)) : 0
  return data.currentBalance + income - expenses - purchase - emergency - unexpectedBill - weekendLift
}

export function purchaseEffect(data, scenario, amount, day = 30) {
  if (day < scenario.purchaseDay) return 0
  const price = Number(amount || 0)
  if (scenario.id === 'emi') return Number(data.assumptions.emiDownPayment || 0) + Number(data.assumptions.emiMonthlyPayment || 0)
  if (scenario.id === 'alternative') return Number(data.assumptions.alternativeAmount || 0)
  return price
}

export function validateDecision(data, decision) {
  const amount = Number(decision.amount)
  if (!decision.name?.trim()) return 'Add a name for the decision.'
  if (!Number.isFinite(amount) || amount <= 0) return 'Enter a purchase amount greater than ₹0.'
  if (amount > data.currentBalance * 2) return 'That amount is unusually high for this demo balance. Try a smaller amount.'
  if (!Number.isFinite(Number(decision.purchaseDay)) || Number(decision.purchaseDay) < 0) return 'Choose a valid purchase date.'
  return ''
}

export function calculateScenario({ data, decision, scenarioId, emergencyEnabled = false, stressTests = {} }) {
  const baseScenario = scenarioDefinitions.find(item => item.id === scenarioId) || scenarioDefinitions[0]
  // "Wait 12 days" is deliberately fixed; all other paths honour the editable purchase date.
  const scenario = baseScenario.id === 'wait' ? { ...baseScenario, purchaseDay: Number(data.assumptions.delayDays || 12) } : { ...baseScenario, purchaseDay: Number(decision.purchaseDay || 0) }
  const amount = Number(decision.amount || 0)
  const totalIncome = sum(data.expectedIncome)
  const totalExpenses = sum(data.upcomingExpenses)
  const baselineBalance = data.currentBalance + totalIncome - totalExpenses
  const activeStress = { ...stressTests, emergency: stressTests.emergency ?? emergencyEnabled }
  const projectedBalance = eventBalance(data, scenario, amount, 30, {})
  const purchaseAtDay = eventBalance(data, scenario, amount, scenario.purchaseDay, false)
  const remainingExpenses = sum(data.upcomingExpenses.filter(item => item.daysUntil > scenario.purchaseDay))
  const buffer = projectedBalance - Math.min(Number(data.assumptions.safetyReserve || 0), remainingExpenses)
  const crashBalance = eventBalance(data, scenario, amount, 30, activeStress)
  const crashBuffer = crashBalance - Math.min(Number(data.assumptions.safetyReserve || 0), remainingExpenses)
  const goal = calculateGoalImpact({ goal: data.goals?.[0], baselineBalance, projectedBalance })
  const goalImpacts = (data.goals || []).map(item => ({ goal: item, ...calculateGoalImpact({ goal: item, baselineBalance, projectedBalance }) }))
  const riskData = calculateRisk({ buffer, commitments: totalExpenses, goalImpact: goal.impact, crashBuffer })
  const hasIncomeBeforePurchase = throughDay(data.expectedIncome, scenario.purchaseDay).length > 0
  const verdict = generateVerdict({ scenario, risk: riskData.risk, reasons: riskData.reasons, hasIncomeBeforePurchase })
  const timeline = Array.from({ length: 31 }, (_, day) => ({
    day: day === 0 ? 'Today' : `Day ${day}`,
    dayNumber: day,
    currentPlan: eventBalance(data, { ...scenario, id: 'wait', purchaseDay: 99 }, 0, day, {}),
    selected: eventBalance(data, scenario, amount, day, activeStress),
    events: [
      ...data.expectedIncome.filter(item => Number(item.daysUntil) === day).map(item => item.name),
      ...data.upcomingExpenses.filter(item => Number(item.daysUntil) === day).map(item => item.name),
      ...(day === scenario.purchaseDay ? [scenario.label] : []),
      ...(activeStress.emergency && day === 18 ? ['Emergency event'] : []),
      ...(activeStress.unexpectedBill && day === 20 ? ['Unexpected bill'] : [])
    ]
  }))
  const lowCashPoint = timeline.reduce((lowest, point) => point.selected < lowest.selected ? point : lowest, timeline[0])
  const safetyReserve = Number(data.assumptions.safetyReserve || 0)
  const daysBelowSafeZone = timeline.filter(point => point.selected < safetyReserve).length * 7
  const stressExposure = Math.min(100, Math.round((Math.max(0, safetyReserve - buffer) / Math.max(1, safetyReserve) * 60) + (riskData.risk === 'Critical' ? 40 : riskData.risk === 'High' ? 25 : riskData.risk === 'Medium' ? 12 : 4)))
  const confidence = Math.max(52, Math.min(92, 89 - (riskData.risk === 'Critical' ? 24 : riskData.risk === 'High' ? 14 : riskData.risk === 'Medium' ? 7 : 1) - (data.spendingHistory?.length < 8 ? 8 : 0)))
  const selectedStressCount = Object.values(activeStress).filter(Boolean).length
  return { scenario, amount, totalIncome, totalExpenses, baselineBalance, projectedBalance, buffer, purchaseAtDay, remainingExpenses, crashBalance, crashBuffer, goal, goalImpacts, ...riskData, verdict, timeline, lowCashPoint, safetyReserve, daysBelowSafeZone, stressExposure, confidence, selectedStressCount, purchaseEffect: purchaseEffect(data, scenario, amount) }
}
