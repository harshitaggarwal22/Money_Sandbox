export function analyseSpendingBehaviour(transactions = []) {
  const total = transactions.reduce((sum, item) => sum + item.amount, 0)
  const weekend = transactions.filter(item => item.weekend).reduce((sum, item) => sum + item.amount, 0)
  const weekday = total - weekend
  const weekendCount = transactions.filter(item => item.weekend).length || 1
  const weekdayCount = transactions.filter(item => !item.weekend).length || 1
  const weekendAverage = weekend / weekendCount
  const weekdayAverage = weekday / weekdayCount
  const lift = weekdayAverage ? Math.max(0, Math.round((weekendAverage / weekdayAverage - 1) * 100)) : 0
  const categories = transactions.reduce((map, item) => ({ ...map, [item.category]: (map[item.category] || 0) + item.amount }), {})
  const [topCategory, topSpend = 0] = Object.entries(categories).sort((a, b) => b[1] - a[1])[0] || ['Spending', 0]
  return { weekendLift: lift, topCategory, topSpend, averageDaily: transactions.length ? Math.round(total / transactions.length) : 0, categories }
}
